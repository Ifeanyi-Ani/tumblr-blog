import { useForm } from "react-hook-form";
import { FormField } from "../../../ui/shared/FormField";
import {
  Edit2,
  Linkedin,
  Mail,
  Save,
  GithubIcon as GitHub,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../users/userSlice";
import toast from "react-hot-toast";
import { IUser } from "../../../types/type";

interface ProfileFormProps {
  user: IUser;
  userId: string;
}
export const ProfileForm: React.FC<ProfileFormProps> = ({ user, userId }) => {
  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation();
  const { control, handleSubmit: handleSubmitProfile } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email,
      bio: user?.bio,
      github: user?.github || "github link",
      linkedin: user?.linkedin || "linkedin link",
    },
  });
  const [isEditing, setIsEditing] = useState(false);

  const onSubmitProfile = async (data: any) => {
    if (!isEditing) {
      return setIsEditing(true);
    }
    await updateUser({ formData: data, id: userId }).unwrap();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Update successful");
      setIsEditing(false);
    }
    if (error) {
      if ("data" in error) {
        toast.error(error.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  }, [isSuccess, error]);

  return (
    <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-4">
      <FormField
        name="username"
        control={control}
        label="Username"
        disabled={!isEditing}
      />
      <FormField
        name="email"
        type="email"
        label="Email"
        control={control}
        icon={Mail}
        disabled={true}
      />
      <FormField
        name="bio"
        control={control}
        label="Bio"
        multiline
        disabled={!isEditing}
      />
      <div className="flex space-x-4">
        <FormField
          label="GitHub"
          name="github"
          control={control}
          value="GitHub Link"
          icon={GitHub}
          disabled={!isEditing}
        />
        <FormField
          label="LinkedIn"
          name="linkedin"
          control={control}
          value="LinkedIn Link"
          icon={Linkedin}
          disabled={!isEditing}
        />
      </div>

      <div className="flex justify-end space-x-4">
        {!isEditing ? (
          <button
            type="submit"
            className="bg-electricCyan-600 text-customBlue-900 px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Edit2 size={18} />
            <span>Edit</span>
          </button>
        ) : (
          <button
            type="submit"
            className="bg-neonPink-600 text-customBlue-900 px-4 py-2 rounded-lg flex items-center space-x-2"
            disabled={isLoading}
          >
            <Save size={18} />
            <span>Save</span>
          </button>
        )}
      </div>
    </form>
  );
};

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import { FormField } from "../../../ui/shared/FormField";
import Modal from "../../../ui/shared/Modal";
import { useChangePasswordMutation } from "../../users/userSlice";
import { toast } from "react-hot-toast";
import { SubmitBtn } from "../../../ui/shared/SubmitBtn";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  password: z.string().min(8),
  newPassword: z.string().min(8),
  confirmNewPassword: z.string().min(8),
});

type FormType = z.infer<typeof FormSchema>;

export const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePassword, { isLoading, error, isSuccess }] =
    useChangePasswordMutation();
  const {
    handleSubmit: handleSubmitPassword,
    reset: resetPasswordForm,
    control,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmitPassword: SubmitHandler<FormType> = async (data) => {
    try {
      console.log(data);
      await changePassword(data).unwrap();
    } catch (error) {}
  };

  useEffect(
    function () {
      if (isSuccess) {
        toast.success("User password updated successfully");
        setIsModalOpen(false);
        resetPasswordForm();
      }
      if (error) {
        if ("data" in error) {
          toast.error(error.data?.message || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
    [isSuccess, error]
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-electricCyan-300">
        Security Settings
      </h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full bg-customBlue-800 hover:bg-customBlue-700 text-electricCyan-300 font-semibold py-3 px-4 rounded-lg flex justify-between items-center transition-colors duration-200"
      >
        <span>Change Password</span>
        <ChevronRight size={18} />
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Change Password"
      >
        <form
          onSubmit={handleSubmitPassword(onSubmitPassword)}
          className="space-y-4"
        >
          <FormField
            control={control}
            name="password"
            type="password"
            placeholder="Enter your current password"
          />
          <FormField
            control={control}
            name="newPassword"
            type="password"
            placeholder="Enter your new password"
          />
          <FormField
            control={control}
            name="confirmNewPassword"
            type="password"
            placeholder="Confirm your new password"
          />
          <SubmitBtn
            type="submit"
            isLoading={isLoading}
            btnText="Update Password"
            loadingBtnText="Updating..."
          />
        </form>
      </Modal>

      <div className="space-y-4 mt-4">
        <button className="w-full bg-customBlue-800 hover:bg-customBlue-700 text-electricCyan-300 font-semibold py-3 px-4 rounded-lg flex justify-between items-center transition-colors duration-200">
          <span>Two-Factor Authentication</span>
          <ChevronRight size={18} />
        </button>
        <button className="w-full bg-customBlue-800 hover:bg-customBlue-700 text-electricCyan-300 font-semibold py-3 px-4 rounded-lg flex justify-between items-center transition-colors duration-200">
          <span>Active Sessions</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
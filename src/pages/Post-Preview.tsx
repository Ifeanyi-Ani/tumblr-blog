import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useAppSelector } from "../app/hook";

const PostPreview = () => {
  const { id } = useParams<{ id: string }>();

  const post = useAppSelector((state) =>
    state?.posts?.posts?.find((post) => post?.id === id),
  );

  return post ? <PostCard post={post} /> : null;
};

export default PostPreview;

import { useGetPostsQuery } from "./postSlice";
import PostCard from "./PostCard";
import Avater from "../users/Avater";
import { SpinnerCircle } from "../../ui/SpinnerCircle";
import { IPost } from "../../types/type";

const PostList = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery({});

  let content: JSX.Element;
  if (isLoading) {
    content = (
      <div>
        <SpinnerCircle />
      </div>
    );
  } else if (error) {
    if ("status" in error) {
      content = (
        <div>{"error" in error ? error.error : JSON.stringify(error.data)}</div>
      );
    } else {
      // TODO: find the right type to resolve the error showing in the error.data
      content = <div>{error?.message}</div>;
      console.error(error);
    }
  } else if (posts) {
    content = (
      <>
        {posts?.length ? (
          posts.map((post: IPost) => (
            <div
              className="w-full mb-5 relative break-inside-avoid flex divide-x-2 divide-blue-800 gap-x-4"
              key={post._id}
            >
              <Avater src={post.userId.photo} />
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <div>No Posts Available</div>
        )}
      </>
    );
  }

  return (
    <>
      <div>{content!}</div>
    </>
  );
};

export default PostList;

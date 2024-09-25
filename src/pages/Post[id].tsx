import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { LoadingState } from "../ui/shared/LoadingState";
import { useGetPostQuery, useGetPostsQuery } from "../features/posts/postSlice";
import { CustomPageError } from "../ui/shared/CustomPageError";
import { NotFoundState } from "../ui/shared/NotFoundState";
import PostItem from "../ui/shared/PostItem";
import { Post } from "../types/type";
import { BackBtn } from "../ui/shared/BackBtn";

interface PostPreviewProps {
    post: Post;
}

const PostPreview: React.FC<PostPreviewProps> = () => {
    const { postId } = useParams<{ postId: string }>();
    const { data: post, isLoading, error } = useGetPostQuery(postId as string);
    const { data: posts } = useGetPostsQuery(null);

    if (isLoading) return <LoadingState />;
    if (error) return <CustomPageError error={error} title="Error" />;
    if (!post)
        return (
            <NotFoundState
                title="Post Not Found"
                message="We couldn't find the post you are looking for with that postId"
            />
        );

    return (
        <>
            <div className="mb-8">
                <BackBtn text="Back to posts" to="/" />
            </div>
            <PostItem post={post} isPreview />

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-electricCyan-300">
                    Recommended Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.slice(0, 2).map((rec) => (
                        <PostItem post={rec} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default PostPreview;

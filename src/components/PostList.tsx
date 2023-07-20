import React, { Component, ReactNode } from "react";
import { connect, ConnectedProps } from "react-redux";
import { fetchPosts } from "../redux/posts/posts.action";

import shareLogo from "../assets/share.jpg";
import reloadLogo from "../assets/reload.jpg";

import Avater from "./Avater";
import PostCard from "./PostCard";

type PostListProps = ConnectedProps<typeof connector>;

class PostList extends Component<PostListProps> {
  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const { posts } = this.props;

    return (
      <>
        {posts ? (
          [...posts.data.posts].reverse().map((post, idx) => {
            const imageUrl = `https://tumblr-bkend.onrender.com/img/posts/${post.image}`; // Update the URL here

            return (
              <div className='gridItem' key={idx}>
                <Avater
                  src={`https://tumblr-bkend.onrender.com/img/users/${post.userId.photo}`}
                />
                <PostCard
                  userId={post.userId}
                  title={post.title}
                  body={post.body}
                  src={imageUrl}
                  shareLogo={shareLogo}
                  reloadLogo={reloadLogo}
                  category={post.category}
                  postId={post._id}
                  post={post}
                  fetching={fetchPosts}
                />
              </div>
            );
          })
        ) : (
          <div>loading</div>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
});

const connector = connect(mapStateToProps, { fetchPosts });

export default connector(PostList);

import Loader from "../loader";
import clsx from "clsx";
import classes from "../../../pages/mainPage/styles.module.scss";
import PostCard from "../postsCard";
import Button from "../../core/button";
import React, { Ref } from "react";
import { IPost } from "../../../api/posts";

export interface IPostPlaceProps {
  isLoading: boolean;
  isError: boolean;
  posts: IPost[];
  hasNextPage: boolean;
  fetchNextPage: () => void;
  track: Ref<HTMLButtonElement>;
}

const PostsPlace = ({
  isError,
  isLoading,
  posts,
  hasNextPage,
  fetchNextPage,
  track,
}: IPostPlaceProps) => {
  return (
    <Loader isLoading={isLoading} isError={isError}>
      <div className={clsx(classes.main)}>
        <div className={clsx(classes.main__posts)}>
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
        {hasNextPage && (
          <Button
            variant={"outlined"}
            onClick={() => fetchNextPage()}
            ref={track}
          >
            Load More
          </Button>
        )}
      </div>
    </Loader>
  );
};

export default PostsPlace;

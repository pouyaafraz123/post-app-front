import { usePosts } from "../../api/posts";
import React from "react";
import Page from "../../components/layout/page";
import { useInView } from "react-intersection-observer";
import PostCard from "../../components/common/postsCard";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Loader from "../../components/common/loader";


const MainPage = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = usePosts();
  const { ref, inView } = useInView();

  if (inView) {
    fetchNextPage();
  }

  const posts = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Page>
      <Loader isLoading={isLoading} isError={isError}>
        <div className={clsx(classes.main)}>
          <div className={clsx(classes.main__posts)}>
            {posts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} ref={ref}>
              Load More
            </button>
          )}
        </div>
      </Loader>
    </Page>
  );
};

export default MainPage;

import { usePosts } from "../../api/posts";
import React from "react";
import Page from "../../components/layout/page";
import { useInView } from "react-intersection-observer";
import PostsPlace from "../../components/common/postsPlace";

const MainPage = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = usePosts();
  const { ref, inView } = useInView();
  console.log(inView);
  if (inView) {
    fetchNextPage();
  }

  const posts = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Page title={"All Posts"}>
      <PostsPlace
        isLoading={isLoading}
        isError={isError}
        posts={posts}
        hasNextPage={hasNextPage || false}
        fetchNextPage={fetchNextPage}
        track={ref}
      />
    </Page>
  );
};

export default MainPage;

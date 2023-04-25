import Page from "../../components/layout/page";
import Section from "../../components/layout/section";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/users";
import UserCard from "../../components/common/userCard";
import Loader from "../../components/common/loader";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Tabs from "../../components/core/tabs";
import { useState } from "react";
import CommentSection from "../../components/common/commentSection";
import { useInView } from "react-intersection-observer";
import { useUserComments } from "../../api/comments";
import { useUserPosts } from "../../api/posts";
import PostsPlace from "../../components/common/postsPlace";

const ProfilePage = () => {
  const id = useParams<{ id: string }>().id;
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("1");

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery([getUser.name, id], () => getUser(Number(id)), {
    enabled: !!id,
    onError: () => navigate(-1),
  });

  const { data, isLoading, isError, hasNextPage, fetchNextPage } =
    useUserComments(Number(id));

  const {
    data: postData,
    isLoading: isPostsLoading,
    isError: isPostError,
    hasNextPage: hasPost,
    fetchNextPage: fetchPost,
  } = useUserPosts(Number(id));

  const comments = data?.pages.flatMap((page) => page.data) || [];
  const posts = postData?.pages.flatMap((page) => page.data) || [];

  const { ref, inView } = useInView();
  const { ref: tr, inView: inPost } = useInView();

  if (inView) {
    fetchNextPage();
  }

  if (inPost) {
    fetchPost();
  }

  return (
    <Page title={"User Profile"}>
      <Loader isLoading={isUserLoading} isError={isUserError}>
        <div className={clsx(classes.profile)}>
          <div className={clsx(classes.profile__top)}>
            <UserCard
              unselectable
              id={user?.data?.id || 0}
              uid={user?.data?.uid || ""}
              username={user?.data?.username || ""}
              type={user?.data?.type || "REGULAR"}
              email={user?.data?.email || ""}
            />
          </div>
          <Tabs
            onChange={(tab) => setSelectedTab(tab.id)}
            tabs={
              comments.length <= 0 && posts.length <= 0
                ? []
                : comments.length <= 0
                ? [{ id: "1", title: "Posts" }]
                : posts.length <= 0
                ? [{ id: "2", title: "Comments" }]
                : [
                    { id: "1", title: "Posts" },
                    { id: "2", title: "Comments" },
                  ]
            }
            selected={selectedTab}
          />
          {selectedTab === "2" && comments.length > 0 && (
            <div className={clsx(classes.animation)}>
              <Loader isLoading={isLoading} isError={isError}>
                <CommentSection
                  noPadding
                  comments={comments}
                  fetchNextPage={fetchNextPage}
                  track={ref}
                  hasNextPage={hasNextPage}
                  isError={isError}
                  isLoading={isLoading}
                />
              </Loader>
            </div>
          )}
          {selectedTab === "1" && posts.length > 0 && (
            <div className={clsx(classes.animation)}>
              <Loader isLoading={isLoading} isError={isError}>
                <Section title={"Posts"} noPadding>
                  <PostsPlace
                    isLoading={isPostsLoading}
                    isError={isPostError}
                    posts={posts}
                    hasNextPage={hasPost || false}
                    fetchNextPage={fetchPost}
                    track={tr}
                  />
                </Section>
              </Loader>
            </div>
          )}
        </div>
      </Loader>
    </Page>
  );
};

export default ProfilePage;

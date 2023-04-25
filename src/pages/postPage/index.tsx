import Page from "../../components/layout/page";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePost, getPost } from "../../api/posts";
import Loader from "../../components/common/loader";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { Image, Shimmer } from "react-shimmer";
import React from "react";
import { humanizedDate } from "../../utils/date";
import { useComments } from "../../api/comments";
import { useInView } from "react-intersection-observer";
import CommentSection from "../../components/common/commentSection";
import Button from "../../components/core/button";
import { useProfile } from "../../hooks/useProfile";
import { toast } from "react-toastify";
import { getUser } from "../../api/users";

const PostPage = () => {
  const id = useParams<{ id: string }>()?.id;
  const navigate = useNavigate();
  if (!id) {
    navigate(-1);
  }

  const profile = useProfile();

  const { data, isLoading, isError } = useQuery([getPost.name, id], () =>
    getPost(Number(id))
  );

  const { data: user } = useQuery(
    [getUser.name, data?.data?.user_id],
    () => getUser(data?.data?.user_id || -1),
    { enabled: !!data?.data?.user_id }
  );

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    fetchNextPage,
    hasNextPage,
  } = useComments(Number(id));

  const { mutate } = useMutation(deletePost, {
    onSuccess: () => {
      toast.success("Post deleted successfully");
      navigate(-1);
    },
  });

  const { ref, inView } = useInView();

  if (inView) {
    fetchNextPage();
  }
  const comments = commentsData?.pages.flatMap((page) => page.data) || [];

  return (
    <Page title={"Post Detail"}>
      <Loader isLoading={isLoading} isError={isError}>
        <div className={clsx(classes.post)}>
          <div className={clsx(classes.post__content)}>
            <div
              style={{ backgroundImage: `url(${data?.data?.image_url})` }}
              className={clsx(classes.post__banner)}
            >
              <div className={clsx(classes.post__layer)}></div>
            </div>
            <div className={clsx(classes.post__inside)}>
              <div>
                <Image
                  src={data?.data?.image_url || ""}
                  fallback={
                    <Shimmer
                      height={500}
                      width={380}
                      className={clsx(classes.post__shimmer)}
                    />
                  }
                  fadeIn
                  NativeImgProps={{
                    alt: data?.data?.title,
                    className: classes.post__image,
                  }}
                />
              </div>
              <div className={clsx(classes.post__info)}>
                <h1 className={clsx(classes.post__title)}>
                  {data?.data?.title}
                </h1>
                <div className={clsx(classes.post__top)}>
                  <div className={clsx(classes.post__id)}>
                    {data?.data?.uid}
                    <div className={clsx(classes.post__date)}>
                      {humanizedDate(data?.data?.timestamp || "")}
                    </div>
                    <div className={clsx(classes.post__posted)}>
                      Posted By:{" "}
                      <Link
                        to={`/profile/${user?.data?.id}`}
                        className={clsx(classes.post__postedUser)}
                      >
                        {user?.data?.username}
                      </Link>
                    </div>
                  </div>
                  <div className={clsx(classes.post__buttons)}>
                    {profile?.data?.data?.id === data?.data?.user_id && (
                      <Button onClick={() => navigate(`/edit-post/${id}`)}>
                        Edit
                      </Button>
                    )}
                    {(profile?.data?.data?.type === "SUPER_ADMIN" ||
                      profile?.data?.data?.id === data?.data?.user_id) && (
                      <Button
                        color={"error"}
                        onClick={() => mutate(Number(id))}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommentSection
            post_id={Number(id)}
            comments={comments}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            track={ref}
            isError={isCommentsError}
            isLoading={isCommentsLoading}
          />
        </div>
      </Loader>
    </Page>
  );
};

export default PostPage;

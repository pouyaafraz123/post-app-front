import Page from "../../components/layout/page";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost } from "../../api/posts";
import Loader from "../../components/common/loader";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { Image, Shimmer } from "react-shimmer";
import React from "react";
import { humanizedDate } from "../../utils/date";
import { useComments } from "../../api/comments";
import { useInView } from "react-intersection-observer";
import CommentSection from "../../components/common/commentSection";

const PostPage = () => {
  const id = useParams<{ id: string }>()?.id;
  const navigate = useNavigate();
  if (!id) {
    navigate(-1);
  }

  const { data, isLoading, isError } = useQuery([getPost.name, id], () =>
    getPost(Number(id))
  );

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    fetchNextPage,
    hasNextPage,
  } = useComments(Number(id));
  const { ref, inView } = useInView();

  if (inView) {
    fetchNextPage();
  }
  const comments = commentsData?.pages.flatMap((page) => page.data) || [];

  return (
    <Page>
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
                      width={500}
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
                  </div>
                  <div className={clsx(classes.post__date)}>
                    {humanizedDate(data?.data?.timestamp || "")}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CommentSection
            comments={comments}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            ref={ref}
            isError={isCommentsError}
            isLoading={isCommentsLoading}
          />
        </div>
      </Loader>
    </Page>
  );
};

export default PostPage;

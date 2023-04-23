import React, { Ref, useState } from "react";
import { IComment } from "../../../api/comments";
import Section from "../../layout/section";
import Loader from "../loader";
import clsx from "clsx";
import CommentCard from "../commentCard";
import classes from "./styles.module.scss";
import { AddSquareLinear } from "../../icons";
import AddCommentModal from "../addCommentModal";
import Button from "../../core/button";

export interface ICommentSectionProps {
  comments: IComment[];
  isLoading?: boolean;
  isError?: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  track: Ref<HTMLButtonElement>;
  post_id?: number;
  noPadding?:boolean;
}

const CommentSection = ({
  comments,
  hasNextPage,
  fetchNextPage,
  track,
  isError,
  isLoading,
  post_id,
  noPadding
}: ICommentSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {comments.length !== 0 ? (
        <Section
          noPadding={noPadding}
          title={"Comments"}
          customAction={
            post_id && (
              <div className={clsx(classes.add)} onClick={() => setOpen(true)}>
                <AddSquareLinear />
                <span>Add Comment</span>
              </div>
            )
          }
        >
          <Loader isLoading={isLoading || false} isError={isError || false}>
            <div className={clsx(classes.comments)}>
              {comments.map((comment, index) => {
                return <CommentCard {...comment} key={index} />;
              })}
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
        </Section>
      ) : (
        <div className={clsx(classes.btn)}>
          <Button onClick={() => setOpen(true)}>Add Comment</Button>
        </div>
      )}
      <AddCommentModal
        open={open && !!post_id}
        setOpen={setOpen}
        id={post_id || -1}
      />
    </>
  );
};

export default CommentSection;

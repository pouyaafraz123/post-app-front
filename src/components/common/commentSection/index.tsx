import React, { LegacyRef } from "react";
import { IComment } from "../../../api/comments";
import Section from "../../layout/section";
import Loader from "../loader";
import clsx from "clsx";
import CommentCard from "../commentCard";
import classes from "./styles.module.scss";

export interface ICommentSectionProps {
  comments: IComment[];
  isLoading?: boolean;
  isError?: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  ref: LegacyRef<HTMLButtonElement>;
}

const CommentSection = ({
  comments,
  hasNextPage,
  fetchNextPage,
  ref,
  isError,
  isLoading,
}: ICommentSectionProps) => {
  return (
    <Section title={"Comments"}>
      <Loader isLoading={isLoading || false} isError={isError || false}>
        <div className={clsx(classes.comments)}>
          {comments.map((comment, index) => {
            return <CommentCard {...comment} key={index} />;
          })}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} ref={ref}>
              Load More
            </button>
          )}
        </div>
      </Loader>
    </Section>
  );
};

export default CommentSection;

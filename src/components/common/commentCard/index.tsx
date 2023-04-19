import React from "react";
import { IComment } from "../../../api/comments";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../api/users";
import { TrashBold } from "../../icons";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useAccess } from "../../../utils/security";

const CommentCard: React.FC<IComment> = ({
  uid,
  id,
  timestamp,
  user_id,
  text,
  post_id,
}) => {
  const check = useAccess();

  const { data } = useQuery([getUser.name, user_id], () =>
    getUser(Number(user_id))
  );

  return (
    <div className={clsx(classes.commentCard)}>
      <div className={clsx(classes.commentCard__top)}>
        <div className={clsx(classes.commentCard__username)}>
          {data?.data?.username}
        </div>
        {check(user_id) && (
          <div>
            <TrashBold />
          </div>
        )}
      </div>
      <div className={clsx(classes.commentCard__text)}>{text}</div>
      <div className={clsx(classes.commentCard__bottom)}>
        <div className={clsx(classes.commentCard__smallText)}>{uid}</div>
        <div className={clsx(classes.commentCard__smallText)}>{timestamp}</div>
      </div>
    </div>
  );
};

export default CommentCard;

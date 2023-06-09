import React from "react";
import { deleteComment, getPostComment, IComment } from "../../../api/comments";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
}) => {
  const check = useAccess();

  const client = useQueryClient();

  const { mutate } = useMutation(deleteComment, {
    onSuccess: () => client.invalidateQueries([getPostComment.name]),
  });

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
          <div onClick={() => mutate(id)} style={{ cursor: "pointer" }}>
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

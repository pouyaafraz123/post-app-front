import React from "react";
import { IPost } from "../../../api/posts";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Image, Shimmer } from "react-shimmer";
import { Link } from "react-router-dom";

const PostCard: React.FC<IPost> = ({ id, title, image_url }) => {
  return (
    <Link to={`/post/${id}`}>
      <div className={clsx(classes.post)}>
        <Image
          src={image_url}
          fallback={
            <Shimmer
              height={500}
              width={360}
              className={clsx(classes.post__shimmer)}
            />
          }
          fadeIn
          NativeImgProps={{ alt: title, className: classes.post__image }}
        />
        <div className={clsx(classes.post__info)}>
          <div>{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;

import { deleteUser, IUser, promoteUser } from "../../../api/users";
import DetailCard from "../detailCard";
import clsx from "clsx";
import { EmailBold, UserBulk, VerifyBold } from "../../icons";
import classes from "./styles.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useProfile } from "../../../hooks/useProfile";
import UpdateUserModal from "../updateUserModal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({
  id,
  type,
  uid,
  username,
  email,
  unselectable,
}: IUser & { unselectable?: boolean }) => {
  const client = useQueryClient();
  const navigate = useNavigate();

  const profile = useProfile();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success("User deleted successfully.");
      client.invalidateQueries();
    },
  });

  const { mutate: promote } = useMutation(promoteUser, {
    onSuccess: () => {
      toast.success("User promoted successfully.");
      client.invalidateQueries();
    },
  });

  return (
    <div
      onClick={() => {
        if (!unselectable) {
          navigate(`/profile/${id}`);
        }
      }}
      className={clsx(classes.wrapper, unselectable && classes.wrapperHover)}
    >
      <DetailCard
        isProfile={unselectable}
        hasDelete={
          (type !== "SUPER_ADMIN" || profile?.data?.data?.id === id) &&
          (profile?.data?.data?.type === "SUPER_ADMIN" ||
            profile?.data?.data?.id === id)
        }
        hasUpdate={profile?.data?.data?.id === id}
        hasPromote={
          type !== "SUPER_ADMIN" && profile?.data?.data?.type === "SUPER_ADMIN"
        }
        onPromote={() => promote(id)}
        onUpdate={() => setOpen(true)}
        onDelete={() => mutate(id)}
        icon={<UserBulk />}
        title={"User Details"}
        subTitle={
          <>
            <span className={clsx(classes.userCard__titles)}>Username: </span>
            <span className={clsx(classes.userCard__text)}>{username}</span>
          </>
        }
        text={<span className={clsx(classes.userCard__primary)}>{uid}</span>}
        chips={[
          {
            icon: <VerifyBold className={clsx(classes.userCard__icons)} />,
            texts: [
              <>
                <span className={clsx(classes.userCard__titles)}>Type: </span>
                <span className={clsx(classes.userCard__text)}>{type}</span>
              </>,
            ],
            color: "#5617cc",
          },
          {
            icon: <EmailBold className={clsx(classes.userCard__icons)} />,
            texts: [
              <>
                <span className={clsx(classes.userCard__titles)}>Email: </span>
                <span className={clsx(classes.userCard__text)}>{email}</span>
              </>,
            ],
            color: "#1c548b",
          },
        ]}
      />
      <UpdateUserModal id={id} setOpen={setOpen} open={open} />
    </div>
  );
};

export default UserCard;

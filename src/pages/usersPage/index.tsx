import Page from "../../components/layout/page";
import { useUsers } from "../../api/users";
import Banner from "../../components/common/banner";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Loader from "../../components/common/loader";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import UserCard from "../../components/common/userCard";
import Button from "../../components/core/button";
import { AddSquareLinear } from "../../components/icons";
import AddUserModal from "../../components/common/addUserModal";

const UsersPage = () => {
  const { isLoading, isError, data, hasNextPage, fetchNextPage } = useUsers();

  const { ref, inView } = useInView();

  if (inView) {
    fetchNextPage();
  }

  const users = data?.pages.flatMap((page) => page.data) || [];

  const [open, setOpen] = useState(false);

  return (
    <Page title={"All Users"}>
      <div className={clsx(classes.userPage)}>
        <Banner
          isLoading={isLoading}
          isError={isError}
          count={data?.pages[0]?.total}
          title={"Total Users"}
        />
        <Button
          variant={"outlined"}
          icon={AddSquareLinear}
          onClick={() => setOpen(true)}
        >
          Add New User
        </Button>
        <div className={clsx(classes.userPage__items)}>
          <Loader isLoading={isLoading} isError={isError}>
            {users?.map((user, index) => {
              return <UserCard {...user} key={index} />;
            })}
            {hasNextPage && (
              <Button
                variant={"outlined"}
                onClick={() => fetchNextPage()}
                ref={ref}
              >
                Load More
              </Button>
            )}
          </Loader>
        </div>
      </div>
      <AddUserModal open={open} setOpen={setOpen} />
    </Page>
  );
};

export default UsersPage;

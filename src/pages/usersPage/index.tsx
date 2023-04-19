import Page from "../../components/layout/page";
import { useUsers } from "../../api/users";
import Banner from "../../components/common/banner";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Loader from "../../components/common/loader";
import React from "react";
import { useInView } from "react-intersection-observer";

const UsersPage = () => {
  const { isLoading, isError, data, hasNextPage, fetchNextPage } = useUsers();

  const { ref, inView } = useInView();

  if (inView) {
    fetchNextPage();
  }
  console.log(hasNextPage);

  const users = data?.pages.flatMap((page) => page.data) || [];

  return (
    <Page>
      <div className={clsx(classes.userPage)}>
        <Banner
          isLoading={isLoading}
          isError={isError}
          count={data?.pages[0]?.total}
          title={"Total Users"}
        />
        <div>
          <Loader isLoading={isLoading} isError={isError}>
            {users?.map((user, index) => {
              return <div>{JSON.stringify(user)}</div>;
            })}
            {hasNextPage && (
              <button onClick={() => fetchNextPage()} ref={ref}>
                Load More
              </button>
            )}
          </Loader>
        </div>
      </div>
    </Page>
  );
};

export default UsersPage;

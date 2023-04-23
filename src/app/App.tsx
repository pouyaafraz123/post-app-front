import React from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../hooks/useAuth";
import { APIConfigurator } from "../components/other/APIConfigurator";
import { ToastContainer } from "react-toastify";
import { TOAST_PROPS } from "../constant/toast";
import "react-toastify/dist/ReactToastify.css";
import { router, userRouter } from "../constant/router";
import { useProfile } from "../hooks/useProfile";

function App() {
  const client = new QueryClient({
    defaultOptions: { queries: { keepPreviousData: true } },
  });

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <div className={clsx(classes.app)}>
          <Router />
        </div>
        <ToastContainer {...TOAST_PROPS} />
        <APIConfigurator />
      </AuthProvider>
    </QueryClientProvider>
  );
}

const Router = () => {
  const profile = useProfile();

  return (
    <Routes>
      {profile?.data?.data?.type === "SUPER_ADMIN"
        ? router.map((r) => <Route {...r} />)
        : userRouter.map((r) => <Route {...r} />)}
    </Routes>
  );
};

export default App;

import React, { PropsWithChildren } from "react";
import BounceLoader from "react-spinners/BounceLoader";

export interface ILoaderProps extends PropsWithChildren<any> {
  isLoading: boolean;
  isError: boolean;
}

const Loader: React.FC<ILoaderProps> = ({ isError, isLoading, children }) => {
  if (isLoading)
    return (
      <div
        style={{
          /* height: "100vh",*/
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          width: "100%",
        }}
      >
        <BounceLoader size={100} color={"#29A9E14D"} loading={true} />
      </div>
    );
  if (isError) return <div>is Error...</div>;
  return <>{children}</>;
};

export default Loader;

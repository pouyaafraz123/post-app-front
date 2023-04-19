import { PropsWithChildren } from "react";
import { BeatLoader as ReactBeatLoader } from "react-spinners";

interface IBeatLoader extends PropsWithChildren<any> {
  isLoading?: boolean;
  isError?: boolean;
  loaderClassName?: string;
  errorClassName?: string;
}

const BeatLoader = ({
  isLoading,
  isError,
  children,
  loaderClassName,
  errorClassName,
}: IBeatLoader) => {
  if (isLoading) {
    return (
      <div className={loaderClassName}>
        <ReactBeatLoader color="#fff" size={10} margin={2} />
      </div>
    );
  }
  if (isError) {
    return <p className={errorClassName}>Something went wrong</p>;
  }

  return <>{children}</>;
};

export default BeatLoader;

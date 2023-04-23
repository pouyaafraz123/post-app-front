import { ReactComponent as ErrorBoldSVG } from "../../assets/icons/error-bold.svg";

function ErrorBold(props: { [key: string]: any }) {
  return <ErrorBoldSVG data-variant="bold" {...props} />;
}

export { ErrorBold };

import { ReactComponent as HomeIconSVG } from "../../assets/icons/home.svg";

function HomeIcon(props: { [key: string]: any }) {
  return <HomeIconSVG data-variant="bold" {...props} />;
}

export { HomeIcon };

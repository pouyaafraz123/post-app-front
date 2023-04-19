import { ReactComponent as MenuIconSVG } from "../../assets/icons/Menu.svg";

function MenuIcon(props: { [key: string]: any }) {
  return <MenuIconSVG data-variant="bold" {...props} />;
}

export { MenuIcon };

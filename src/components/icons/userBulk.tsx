import { ReactComponent as UserBulkSVG } from "../../assets/icons/user-bulk.svg";
import classes from "./styles.module.scss";

function UserBulk(props: { [key: string]: any }) {
  return (
    <UserBulkSVG data-variant="bulk" className={classes.icon} {...props} />
  );
}

export { UserBulk };

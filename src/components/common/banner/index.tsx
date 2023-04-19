import classes from "./styles.module.scss";
import backImage from "../../../assets/images/banner-back-img.svg";
import backLine from "../../../assets/images/banner-back-line.svg";
import clsx from "clsx";
// import { BeatLoader } from "react-spinners";
import BeatLoader from "../beatLoader";

// banner props type interface
interface IBannerProps {
  count: number;
  title: string;
  text: string;
  className?: string;
  isLoading?: boolean;
  isError?: boolean;
}

// banner component display some data in form of banner
const Banner = ({
  count,
  title,
  text,
  className,
  isError,
  isLoading,
}: IBannerProps) => {
  // render component
  return (
    <div
      className={clsx([classes.container, className])}
      style={{ backgroundImage: `url(${backImage}),url(${backLine})` }}
    >
      <BeatLoader {...{ isError, isLoading }}>
        <div className={classes.container__count}>{`+${count}`}</div>
      </BeatLoader>
      <h1 className={classes.container__title}>{title}</h1>
      <p className={classes.container__text}>{text}</p>
    </div>
  );
};

// banner default props
Banner.defaultProps = {
  count: 0,
  title: "Title",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque.",
};

export default Banner;

import clsx from "clsx";
import { ReactNode } from "react";
import classes from "./styles.module.scss";

// IconChip props type interface
export interface IIconChipProps {
  color: string; // color in form of hex string e.g. #fff
  icon: ReactNode; // svg in format of React Node
  texts: string[] | ReactNode[]; // array of strings
}

// IconChip component for displaying chip with specified icon and color and can add multiple text to it
const IconChip = ({ color, icon, texts }: IIconChipProps) => {
  // render component
  return (
    <div className={clsx(classes.chip)}>
      <div
        className={clsx(classes.chip__iconPlace)}
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className={clsx(classes.chip__textPlace)}>{renderTexts(texts)}</div>
    </div>
  );
};

// function to convert texts to styled jsx and render it
const renderTexts = (texts: string[] | ReactNode[]) => {
  return texts.map((text, index) => {
    return (
      <div
        key={index}
        className={clsx(classes.chip__text, index % 2 === 1 && classes.dark)}
      >
        {text}
      </div>
    );
  });
};

export default IconChip;

import clsx from "clsx";
import { ReactNode } from "react";
import IconChip, { IIconChipProps } from "../iconChip";
import classes from "./styles.module.scss";
import CardContainer, { cardThemeType, cardType } from "../cardContainer";
import { TrashBold } from "../../icons";
import Button from "../../core/button";

// Detail Card props type interface
export interface IDetailCardProps {
  type?: cardType; // basic = all white , styled = right is blue , colored = colored background
  theme?: cardThemeType;
  icon: ReactNode;
  title: string;
  subTitle: ReactNode | string;
  text: string | ReactNode;
  chips: IIconChipProps[];
  parentClassName?: string;
  hasDelete?: boolean;
  onDelete?: () => void;
  isProfile?: boolean;
  hasPromote?: boolean;
  hasUpdate?: boolean;
  onUpdate?: () => void;
  onPromote?: () => void;
}

// component which extend CardContainer Component and display detail
const DetailCard = ({
  type,
  theme,
  icon,
  title,
  subTitle,
  text,
  chips,
  parentClassName,
  hasDelete,
  onDelete,
  hasUpdate,
  hasPromote,
  isProfile,
  onUpdate,
  onPromote,
}: IDetailCardProps) => {
  // render component
  return (
    <CardContainer type={type} theme={theme} className={parentClassName}>
      <div className={clsx(classes.row)}>
        <div className={clsx(classes.detailCardContainer)}>
          <div className={clsx(classes.detailCardContainer__bar)}>
            <div className={clsx(classes.detailCardContainer__top)}>
              <div>{icon}</div>
              <div className={clsx(classes.detailCardContainer__title)}>
                {title}
              </div>
            </div>
            {hasDelete && !isProfile && (
              <div
                className={clsx(classes.detailCardContainer__danger)}
                onClick={(e) => {
                  if (onDelete) {
                    onDelete();
                  }
                  e.stopPropagation();
                }}
              >
                <TrashBold />
              </div>
            )}
          </div>
          <div className={clsx(classes.detailCardContainer__middle)}>
            <div className={clsx(classes.detailCardContainer__sub)}>
              {subTitle}
            </div>
            <div className={clsx(classes.detailCardContainer__text)}>
              {text}
            </div>
          </div>
          <div className={clsx(classes.detailCardContainer__bottom)}>
            {renderChips(chips)}
          </div>
        </div>
        {isProfile && (
          <div className={clsx(classes.detailCardContainer__buttons)}>
            {hasUpdate && <Button onClick={onUpdate}>Update</Button>}
            {hasPromote && (
              <Button color={"warning"} onClick={onPromote}>
                Promote
              </Button>
            )}
            {hasDelete && (
              <Button color={"error"} onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
        )}
      </div>
    </CardContainer>
  );
};

// function to convert chips data to IconChip Component and render it
const renderChips = (chips: IIconChipProps[]) => {
  return chips.map(({ color, icon, texts }, index) => {
    return <IconChip color={color} icon={icon} texts={texts} key={index} />;
  });
};

export default DetailCard;

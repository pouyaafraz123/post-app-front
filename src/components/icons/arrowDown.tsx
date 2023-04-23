import { ReactComponent as ArrowBoldSVG } from "../../assets/icons/arrow-down-bold.svg";
import { ReactComponent as ArrowDownLinearSVG } from "../../assets/icons/arrow-down-linear.svg";

function ArrowDownBold(props: { [key: string]: any }) {
  return <ArrowBoldSVG data-variant="bold" {...props} />;
}

function ArrowDownLinear(props: { [key: string]: any }) {
  return <ArrowDownLinearSVG data-variant="bold" {...props} />;
}

export { ArrowDownBold, ArrowDownLinear };

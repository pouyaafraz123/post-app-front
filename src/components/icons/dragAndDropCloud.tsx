import { ReactComponent as DragAndDropCloudSVG } from "../../assets/images/dragAndDrop/cloud.svg";

function DragAndDropCloud(props: { [key: string]: any }) {
  return <DragAndDropCloudSVG data-variant="bold" {...props} />;
}

export { DragAndDropCloud };

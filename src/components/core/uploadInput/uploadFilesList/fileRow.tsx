import React, { memo, useMemo } from "react";
import ExcelFile from "../../../../assets/images/dragAndDrop/excelFile.svg";
import classes from "./styles.module.scss";
import { EXCEL_FORMATS, IMAGE_FORMATS } from "../../../../constant/uploader";
import { humanizedFileSize } from "../../../../utils/convert";
import { SuccessSquareLinear, TrashBold } from "../../../icons";

interface IFileRow {
  file: File;
  index: number;
  onRemove?: (index: number) => void;
}

// row component for list of uploaded file
function FileRow({ file, onRemove, index }: IFileRow) {
  const fileType = useMemo(() => {
    if (EXCEL_FORMATS.includes(file.type)) return "excel";
    if (IMAGE_FORMATS.includes(file.type)) return "image";
  }, [file.type]);
  //render component
  return (
    <div className={classes.fileRow}>
      <img
        className={
          fileType === "image" ? classes.fileRow__image : classes.fileRow__excel
        }
        src={fileType === "excel" ? ExcelFile : URL.createObjectURL(file)}
        alt="file"
      />

      <div className={classes.fileRow__info}>
        {file.name} {"("}
        {humanizedFileSize(file.size)}
        {")"}
      </div>
      <SuccessSquareLinear />
      {onRemove && (
        <TrashBold
          className={classes.fileRow__trash}
          onClick={() => onRemove(index)}
        />
      )}
    </div>
  );
}

export default memo(FileRow);

import React, { HTMLAttributes, useEffect, useRef, useState } from "react";
import classes from "./styles.module.scss";
import clsx from "clsx";
import Button from "../button";
import UploadFilesList from "./uploadFilesList";
import { EXCEL_FORMATS, IMAGE_FORMATS } from "../../../constant/uploader";
import { DragAndDropCloud, ErrorSquareLinear } from "../../icons";

type TFileType = "image" | "excel";

export interface IUploadInputDefaultProps {
  text: string;
  dropText?: string;
  inputProps?: HTMLAttributes<HTMLInputElement>;
  type?: TFileType;
  fileUploadCount: number;
  onChange?: (files: File[]) => void;
  className?: string;
  error?: string;
  filesList?: File[];
}

// custom input for uploading file like image
function UploadInput({
  inputProps,
  text,
  dropText,
  type,
  fileUploadCount,
  className,
  onChange,
  filesList,
  error: formError,
}: IUploadInputDefaultProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState<File[]>(filesList || []);

  useEffect(() => {
    setFiles(filesList || []);
  }, [filesList]);

  // get error from form
  useEffect(() => {
    if (formError && !error) setError(formError);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formError]);
  // function to iterate through files and return list of files
  const fileListIterator = (fileList: FileList) => {
    let temp: File[] = [];
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      temp.push(element);
    }
    return temp;
  };
  // file type validation
  const validateFile = (fileList: FileList | null): boolean => {
    if (fileList === null) return false;
    if (fileList.length + files.length > fileUploadCount) {
      setError(
        `You can only upload ${fileUploadCount} file${
          fileUploadCount > 1 ? "s" : ""
        }`
      );
      return false;
    }
    if (type === "excel") {
      for (let index = 0; index < fileList.length; index++) {
        if (!EXCEL_FORMATS.includes(fileList[index].type)) {
          setError(
            `The file${fileUploadCount > 1 ? "s" : ""} format is not acceptable`
          );
          return false;
        }
      }
    } else if (type === "image") {
      for (let index = 0; index < fileList.length; index++) {
        if (!IMAGE_FORMATS.includes(fileList[index].type)) {
          setError(
            `The file${fileUploadCount > 1 ? "s" : ""} format is not acceptable`
          );
          return false;
        }
      }
    }
    return true;
  };
  // function to detect drag enter
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setError("");
  };
  // function to detect drag exit
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // get files when drag and dropped
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const inputFiles = e.dataTransfer.files;
    if (validateFile(inputFiles)) {
      let newFileList = [...fileListIterator(inputFiles), ...files];
      setFiles(newFileList);
      onChange?.(newFileList);
    }
  };
  // add files to list on input change event
  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (inputFiles && validateFile(inputFiles)) {
      let newFileList = [...files, ...fileListIterator(inputFiles)];
      setFiles(newFileList);
      onChange?.(newFileList);
    }
    e.target.value = "";
  };
  // function to handle removing item
  const onRemoveItem = (index: number) => {
    const tempFiles = [...files].filter((item, i) => i !== index);
    console.log(tempFiles);

    setFiles(tempFiles);
    onChange?.(tempFiles);
  };
  // render component
  return (
    <div
      className={clsx(
        classes.container,
        className ?? "",
        dragging && classes.dragging
      )}
    >
      <div
        className={clsx(
          classes.container__dragBox,
          dragging && classes.dragging
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        data-testid="hidden-div"
      />
      <DragAndDropCloud
        className={clsx(classes.container__image, dragging && classes.dragging)}
      />
      <h3
        className={clsx(classes.container__title, dragging && classes.dragging)}
      >
        {dragging ? dropText : text}
      </h3>
      <div
        className={clsx(
          classes.container__subtitle,
          dragging && classes.dragging
        )}
      >
        OR
      </div>
      <input
        type="file"
        accept={
          type === "excel"
            ? EXCEL_FORMATS.join(", ")
            : type === "image"
            ? IMAGE_FORMATS.join(", ")
            : ""
        }
        className={"d-none"}
        onChange={inputOnChange}
        ref={inputRef}
        style={{display:"none"}}
        data-testid="hidden-input"
        multiple={fileUploadCount > 1}
        {...inputProps}
      />
      <Button
        className={clsx(
          classes.container__button,
          dragging && classes.dragging
        )}
        disabled={files.length === fileUploadCount}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        Select File
      </Button>
      {error && (
        <div
          className={clsx(classes.container__error)}
          onClick={() => setError("")}
        >
          {error}
          <div className={clsx(classes.container__error__icon)}>
            <ErrorSquareLinear />
          </div>
        </div>
      )}
      <UploadFilesList files={files} onRemoveItem={onRemoveItem} />
    </div>
  );
}

UploadInput.defaultProps = {
  text: "Drag & Drop your file Here",
  dropText: "Drop your file Here",
  type: "excel",
  fileUploadCount: 1,
};

export default UploadInput;

import { memo, useMemo } from "react";
import FileRow from "./fileRow";
import classes from "./styles.module.scss";

interface IUploadFilesList {
  files?: File[];
  onRemoveItem: (index: number) => void;
}
// component for making list of uploaded files
function UploadFilesList({ files, onRemoveItem }: IUploadFilesList) {
  const filesList = useMemo(() => {
    const temp = [];
    if (files)
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file)
          temp.push(
            <FileRow
              file={file}
              index={index}
              onRemove={onRemoveItem}
              key={file?.name ?? "" + index}
            />
          );
      }
    return temp;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  if (!files) return null;
  return <div className={classes.container}>{filesList}</div>;
}

export default memo(UploadFilesList);

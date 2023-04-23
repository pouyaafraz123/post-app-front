/**
 * get the file size in bytes in convert to KB, MB, GB
 * @param size file size
 */
export function humanizedFileSize(size: number) {
  if (size === 0) return "0 Bytes";
  const k = 1000,
    dm = 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(size) / Math.log(k));
  return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

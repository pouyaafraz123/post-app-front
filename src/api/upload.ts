import apiCaller, { IResponse } from "./index";

export interface IUploadImage {
  filename: string;
}
export function uploadImage(data: {
  image: File;
}): Promise<IResponse<IUploadImage>> {
  return apiCaller.post("/post/image", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

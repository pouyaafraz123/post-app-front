import Page from "../../components/layout/page";
import { useFormik } from "formik";
import FormTextarea from "../../components/form/formTextarea";
import { getFormikFieldProps } from "../../utils/form";
import UploadInput from "../../components/core/uploadInput";
import { useEffect, useState } from "react";
import Button from "../../components/core/button";
import clsx from "clsx";
import classes from "./styles.module.scss";
import yup from "../../utils/yupExtended";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "../../api/upload";
import { getPost, getPosts, ISendPostParams, sendPost, updatePost } from "../../api/posts";
import { BASE_URL } from "../../api";
import { useNavigate } from "react-router-dom";
import { useUpdateMode } from "../../utils/history";
import Loader from "../../components/common/loader";

export interface IAddPostFields {
  title: string;
}

const AddPost = () => {
  const navigate = useNavigate();
  const client = useQueryClient();
  const { isEditing, id } = useUpdateMode();
  console.log(isEditing);

  const {
    data,
    isLoading: isDataLoading,
    isError: isDataError,
  } = useQuery([getPost.name, id], () => getPost(id || -1), {
    enabled: !!id && isEditing,
  });

  const [file, setFile] = useState<File>();

  const { mutate: upload, isLoading: isUploading } = useMutation(uploadImage);
  const { mutate, isLoading } = useMutation(sendPost);
  const { mutate: update, isLoading: isUpdating } = useMutation(
    [updatePost.name, id],
    (data: ISendPostParams) => updatePost(id || -1, data)
  );

  const formik = useFormik<IAddPostFields>({
    initialValues: { title: "" },
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      if (!file) {
        toast.error("You must upload image");
        return;
      }
      toast.info("Stat uploading image...");
      upload(
        { image: file },
        {
          onSuccess: (data) => {
            toast.success("Image uploading successfully.");
            if (!isEditing) {
              mutate(
                {
                  title: values.title,
                  image_url: BASE_URL + data?.data?.filename,
                },
                {
                  onSuccess: () => {
                    toast.success("Post added successfully.");
                    client.invalidateQueries([getPost.name]);
                    client.invalidateQueries([getPosts.name]);
                    navigate("/");
                  },
                }
              );
            } else {
              update(
                {
                  title: values.title,
                  image_url: BASE_URL + data?.data?.filename,
                },
                {
                  onSuccess: () => {
                    toast.success("Post updated successfully.");
                    client.invalidateQueries([getPost.name]);
                    client.invalidateQueries([getPosts.name]);
                    navigate(-1);
                  },
                }
              );
            }
          },
        }
      );
    },
    validationSchema: yup.object().shape({
      title: yup.string().required("This fields is required."),
    }),
  });

  async function createFile(url?: string) {
    if (!url) return undefined;
    let response = await fetch(url);
    let data = await response.blob();
    const urlParts = url.split("/");
    return new File([data], urlParts[urlParts.length - 1]);
  }

  useEffect(() => {
    if (isEditing) {
      formik.setValues({ title: data?.data?.title || "" });
      createFile(data?.data?.image_url).then((f) => {
        setFile(f);
      });
    }

    if (!isEditing) {
      setFile(undefined);
      formik.setValues({ title: "" });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isEditing]);

  return (
    <Page title={"Add Post"}>
      <Loader isLoading={isDataLoading && isEditing} isError={isDataError}>
        <form className={clsx(classes.addPost)} onSubmit={formik.handleSubmit}>
          <FormTextarea
            {...getFormikFieldProps("title", "Post Title", formik)}
            rootProps={{ placeholder: "Post Title" }}
          />
          {!isEditing && (
            <UploadInput
              type={"image"}
              fileUploadCount={1}
              onChange={(files) => setFile(files[0])}
              filesList={file ? [file] : []}
            />
          )}
          <div className={clsx(classes.addPost__btn)}>
            <Button
              type={"submit"}
              disabled={isUploading || isLoading || isUpdating}
              isLoading={isUploading || isLoading || isUpdating}
            >
              {isEditing ? "Edit Post" : "Add Post"}
            </Button>
          </div>
        </form>
      </Loader>
    </Page>
  );
};
export default AddPost;

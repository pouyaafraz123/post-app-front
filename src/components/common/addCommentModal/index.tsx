import Modal from "../modal";
import { Dispatch, SetStateAction } from "react";
import FormTextarea from "../../form/formTextarea";
import { getFormikFieldProps } from "../../../utils/form";
import { useFormik } from "formik";
import yup from "../../../utils/yupExtended";
import Button from "../../core/button";
import { AddSquareLinear, DescriptionBold } from "../../icons";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment, getPostComment } from "../../../api/comments";
import { toast } from "react-toastify";

export interface IAddCommentProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export interface IAddCommentFields {
  comment: string;
}

const AddCommentModal = ({ open, setOpen, id }: IAddCommentProps) => {
  const client = useQueryClient();

  const { mutate } = useMutation(
    [addComment.name, id],
    (text: string) => addComment(id, text),
    {
      onSuccess: () => {
        toast.success("Comment added.");
        client.invalidateQueries([getPostComment.name]);
      },
      onError: () => {
        setOpen(true);
        toast.error("Problem in adding comment.");
      },
    }
  );

  const formik = useFormik<IAddCommentFields>({
    initialValues: { comment: "" },
    onSubmit: (values, formikHelpers) => {
      setOpen(false);
      mutate(values.comment);
      formikHelpers.resetForm();
    },
    validationSchema: yup.object().shape({
      comment: yup.string().required("This fields is required."),
    }),
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <Modal
      open={open}
      backdrop={true}
      onClose={() => setOpen(false)}
      title={"Add Comment"}
      draggable={false}
    >
      <form
        className={clsx(classes.addComment)}
        onSubmit={(e) => {
          formik.handleSubmit(e);
        }}
      >
        <FormTextarea
          {...getFormikFieldProps("comment", "", formik)}
          rootProps={{ placeholder: "Comment", icon: DescriptionBold }}
        />
        <Button icon={AddSquareLinear} type={"submit"}>
          Add Comment
        </Button>
      </form>
    </Modal>
  );
};

export default AddCommentModal;

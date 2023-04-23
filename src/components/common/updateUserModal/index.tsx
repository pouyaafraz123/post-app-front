import Modal from "../modal";
import { Dispatch, SetStateAction, useEffect } from "react";
import yup from "../../../utils/yupExtended";
import { useFormik } from "formik";
import FormInput from "../../form/formInput";
import { getFormikFieldProps } from "../../../utils/form";
import { EmailBold } from "../../icons";
import Button from "../../core/button";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, IUpdateUserParams, updateUser } from "../../../api/users";
import Loader from "../loader";

export interface IUpdateUserModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
}

export interface IUpdateUserFields {
  username: string;
  email: string;
}
const AddUserModal = ({ open, setOpen, id }: IUpdateUserModalProps) => {
  const client = useQueryClient();
  const { mutate } = useMutation(
    [updateUser.name, id],
    (data: IUpdateUserParams) => updateUser(id, data),
    {
      onSuccess: () => {
        client.invalidateQueries();
        setOpen(false);
      },
      onError: () => setOpen(true),
    }
  );

  const { data, isLoading, isError } = useQuery([getUser.name, id], () =>
    getUser(id)
  );

  const formik = useFormik<IUpdateUserFields>({
    initialValues: {
      email: "",
      username: "",
    },
    onSubmit: (values) => {
      setOpen(false);
      mutate({
        username: values.username,
        email: values.email,
      });
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("This field is required"),
      email: yup.string().email().required("This field is required"),
    }),
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.setValues({
      email: data?.data?.email || "",
      username: data?.data?.username || "",
    });
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [data, open]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title={"Update User"}
      draggable={false}
      backdrop={true}
    >
      <Loader isLoading={isLoading} isError={isError}>
        <form onSubmit={formik.handleSubmit} className={clsx(classes.addUser)}>
          <div className={clsx(classes.addUser__inputs)}>
            <FormInput
              {...getFormikFieldProps("username", "Username", formik)}
              rootProps={{ placeholder: "Username" }}
            />
            <FormInput
              {...getFormikFieldProps("email", "Email", formik)}
              rootProps={{ placeholder: "Email", icon: EmailBold }}
            />
          </div>
          <Button type={"submit"}>Update User</Button>
        </form>
      </Loader>
    </Modal>
  );
};

export default AddUserModal;

import Modal from "../modal";
import { Dispatch, SetStateAction, useEffect } from "react";
import yup from "../../../utils/yupExtended";
import { useFormik } from "formik";
import FormInput from "../../form/formInput";
import { getFormikFieldProps } from "../../../utils/form";
import { EmailBold, VerifyBold } from "../../icons";
import Button from "../../core/button";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers } from "../../../api/users";
import FormPassword from "../../form/password";
import { TUserType } from "../../../api/auth";
import FormAutoComplete from "../../form/formAutoComplete";
import { USER_TYPE_OPTIONS } from "../../../constant/options";

export interface IAddUserModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IAddUserFields {
  username: string;
  email: string;
  password: string;
  type: { key: string; value: string };
}
const AddUserModal = ({ open, setOpen }: IAddUserModalProps) => {
  const client = useQueryClient();

  const { mutate } = useMutation(createUser, {
    onSuccess: () => {
      client.invalidateQueries([getUsers.name]);
      setOpen(false);
    },
    onError: () => setOpen(true),
  });

  const formik = useFormik<IAddUserFields>({
    initialValues: {
      email: "",
      username: "",
      password: "",
      type: { key: "", value: "" },
    },
    onSubmit: (values) => {
      setOpen(false);
      mutate({
        username: values.username,
        password: values.password,
        email: values.email,
        type: values.type.key as TUserType,
      });
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("This field is required"),
      email: yup.string().email().required("This field is required"),
      password: yup.string().min(4).required("This field is required"),
      type: yup.object().dropdown().required("This field is required"),
    }),
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title={"Add User"}
      draggable={false}
      backdrop={true}
    >
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
          <FormPassword
            {...getFormikFieldProps("password", "Password", formik)}
            rootProps={{ placeholder: "Password" }}
          />
          <FormAutoComplete
            options={USER_TYPE_OPTIONS}
            {...getFormikFieldProps("type", "Type", formik)}
            rootProps={{ placeholder: "Type", icon: VerifyBold }}
          />
        </div>
        <Button type={"submit"}>Add User</Button>
      </form>
    </Modal>
  );
};

export default AddUserModal;

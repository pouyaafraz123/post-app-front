import clsx from "clsx";
import classes from "./styles.module.scss";
import { useEffect } from "react";
import Button from "../../components/core/button";
import img from "../../assets/images/login-back.jpg";
import { useAuth } from "../../hooks/useAuth";
import { useFormik } from "formik";
import yup from "../../utils/yupExtended";
import FormInput from "../../components/form/formInput";
import FormPassword from "../../components/form/password";
import { getFormikFieldProps } from "../../utils/form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";

export interface ILoginFields {
  username: string;
  password: string;
  email?: string;
}

const LoginPage = () => {
  /*const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting form v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);*/

  const { pathname } = useLocation();

  const isSignup = pathname.includes("signup");
  const { mutate } = useMutation(register);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isLoggedIn && !isSignup) {
      navigate("/");
    }
  }, [auth.isLoggedIn, isSignup, navigate]);

  const formik = useFormik<ILoginFields>({
    initialValues: {
      password: "",
      username: "",
      email: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: yup.object().shape({
      username: yup.string().required("This Field is Required"),
      password: yup.string().min(4).required("This Field is Required"),
      email: isSignup
        ? yup
            .string()
            .email("Enter valid email.")
            .required("This Field is Required.")
        : yup.string(),
    }),
    onSubmit: (values) => {
      if (!isSignup) {
        auth.login({
          username: values.username,
          password: values.password,
        });
      } else {
        mutate(
          {
            username: values.username,
            password: values.password,
            email: values.email || "",
          },
          {
            onSuccess: () => {
              navigate("/login");
            },
          }
        );
      }
    },
  });

  return (
    <div
      className={clsx(classes.loginPage)}
      style={{ backgroundImage: `url(${img})` }}
    >
      {/*<Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesConfig}
        className={clsx(classes.loginPage__particles)}
      />*/}
      <div className={clsx(classes.loginPage__secBack)}></div>
      <form
        className={clsx(classes.loginPage__section)}
        onSubmit={formik.handleSubmit}
      >
        <div
          style={{ backgroundImage: `url(${img})` }}
          className={clsx(classes.loginPage__img)}
        ></div>
        <div className={clsx(classes.loginPage__content)}>
          <div className={clsx(classes.loginPage__title)}>
            <h1 className={clsx(classes.loginPage__title)}>
              {isSignup ? "Signup" : "Login"}
            </h1>
          </div>
          <div></div>
          <div className={clsx(classes.loginPage__inputs)}>
            {!isSignup && (
              <>
                <FormInput
                  rootProps={{
                    placeholder: "Username",
                  }}
                  {...getFormikFieldProps("username", "Username", formik)}
                />
                <FormPassword
                  rootProps={{
                    placeholder: "Password",
                  }}
                  {...getFormikFieldProps("password", "Password", formik)}
                />
                <span className={clsx(classes.loginPage__text)}>
                  Don't have user click{" "}
                  <Link
                    to={"/signup"}
                    className={clsx(classes.loginPage__link)}
                  >
                    {" "}
                    Signup
                  </Link>
                </span>
              </>
            )}
            {isSignup && (
              <>
                <FormInput
                  rootProps={{
                    placeholder: "Username",
                  }}
                  {...getFormikFieldProps("username", "Username", formik)}
                />
                <FormInput
                  rootProps={{
                    placeholder: "Email",
                  }}
                  {...getFormikFieldProps("email", "email", formik)}
                />
                <FormPassword
                  rootProps={{
                    placeholder: "Password",
                  }}
                  {...getFormikFieldProps("password", "Password", formik)}
                />
                <span className={clsx(classes.loginPage__text)}>
                  Back to{" "}
                  <Link to={"/login"} className={clsx(classes.loginPage__link)}>
                    {" "}
                    Login
                  </Link>
                </span>
              </>
            )}
          </div>
          <Button className={clsx(classes.loginPage__btn)} type={"submit"}>
            {isSignup ? "Signup" : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

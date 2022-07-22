import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Components
import FormInput from "../../components/authenticationForm/FormInput";
import FormButton from "../../components/authenticationForm/FormButton";
import Loader from "../../components/Loader";

// Schema
import { AUTHENTICATION_REGISTER_SCHEMA } from "../../schemas/AuthenticationSchema";

// Interfaces
import { RegisterFormValues } from "./interfaces";

// Icons
import { ReactComponent as ToggleIconHidden } from "../../assets/images/hidden.svg";
import { ReactComponent as ToggleIconShow } from "../../assets/images/shown.svg";

// Utilities
import useFetchCall from "../../utils/handleFetchCall";


export default function Register() {
  /*================
  REGISTER USER

  Register the user with the input from the form and redirect to login page if successfull 
  ================*/
  const navigate = useNavigate();
  const { handleFetch } = useFetchCall();

  const handleRegister = async (values: RegisterFormValues) => {
    const { email, password, first_name, last_name } = values;

    const url = "https://movies.codeart.mk/api/auth/register";
    const method = "POST";

    const res = await handleFetch(url, method, { email, password, first_name, last_name });
    if (res) {
      toast.success("Registered successfully");
      navigate("/login");
    }
  };

  /*================
  PASSWORD ICON 

   Show or hide the password by clicking on the icon and show the correct icon
  ================*/
  const [showIcon, setShowIcon] = useState<"show" | "hidden">("hidden");

  const handleIconClick = () => {
    if (showIcon === "hidden") {
      setShowIcon("show");
    } else {
      setShowIcon("hidden");
    }
  };

  return (
    <div className="container">
      <svg
        className="logo"
        width="150"
        height="55"
        viewBox="0 0 150 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M37.355 44.0405L47.7676 38.4692C49.1043 37.7539 49.9023 36.4724 49.9023 35.0412C49.9023 33.6099 49.1043 32.3284 47.7676 31.6131L37.355 26.0418C36.0172 25.3259 34.4208 25.3273 33.0841 26.0457C31.7524 26.7617 30.957 28.0418 30.957 29.4698V40.6125C30.957 42.0405 31.7524 43.3206 33.0841 44.0366C33.7536 44.3965 34.4883 44.5763 35.2234 44.5763C35.9554 44.5763 36.6875 44.398 37.355 44.0405Z"
          fill="#000F93"
        />
        <path
          d="M25.0977 42.7577H7.8125C3.50456 42.7577 0 39.4999 0 35.4952V7.26245C0 3.25782 3.50456 0 7.8125 0H42.1875C46.4954 0 50 3.25782 50 7.26245V25.1462C50 26.1491 49.1257 26.9619 48.0469 26.9619C46.9681 26.9619 46.0938 26.1491 46.0938 25.1462V7.26245C46.0938 5.26032 44.3413 3.63123 42.1875 3.63123H7.8125C5.65872 3.63123 3.90625 5.26032 3.90625 7.26245V35.4952C3.90625 37.4974 5.65872 39.1265 7.8125 39.1265H25.0977C26.1765 39.1265 27.0508 39.9392 27.0508 40.9421C27.0508 41.9449 26.1765 42.7577 25.0977 42.7577ZM11.4258 33.6796C11.4258 32.6768 10.5515 31.864 9.47266 31.864C8.39386 31.864 7.51953 32.6768 7.51953 33.6796C7.51953 34.6825 8.39386 35.4952 9.47266 35.4952C10.5515 35.4952 11.4258 34.6825 11.4258 33.6796ZM19.2383 33.6796C19.2383 32.6768 18.364 31.864 17.2852 31.864C16.2064 31.864 15.332 32.6768 15.332 33.6796C15.332 34.6825 16.2064 35.4952 17.2852 35.4952C18.364 35.4952 19.2383 34.6825 19.2383 33.6796ZM27.0508 33.6796C27.0508 32.6768 26.1765 31.864 25.0977 31.864C24.0189 31.864 23.1445 32.6768 23.1445 33.6796C23.1445 34.6825 24.0189 35.4952 25.0977 35.4952C26.1765 35.4952 27.0508 34.6825 27.0508 33.6796ZM11.4258 9.07807C11.4258 8.07523 10.5515 7.26245 9.47266 7.26245C8.39386 7.26245 7.51953 8.07523 7.51953 9.07807C7.51953 10.0809 8.39386 10.8937 9.47266 10.8937C10.5515 10.8937 11.4258 10.0809 11.4258 9.07807ZM19.2383 9.07807C19.2383 8.07523 18.364 7.26245 17.2852 7.26245C16.2064 7.26245 15.332 8.07523 15.332 9.07807C15.332 10.0809 16.2064 10.8937 17.2852 10.8937C18.364 10.8937 19.2383 10.0809 19.2383 9.07807ZM27.0508 9.07807C27.0508 8.07523 26.1765 7.26245 25.0977 7.26245C24.0189 7.26245 23.1445 8.07523 23.1445 9.07807C23.1445 10.0809 24.0189 10.8937 25.0977 10.8937C26.1765 10.8937 27.0508 10.0809 27.0508 9.07807ZM34.8633 9.07807C34.8633 8.07523 33.989 7.26245 32.9102 7.26245C31.8314 7.26245 30.957 8.07523 30.957 9.07807C30.957 10.0809 31.8314 10.8937 32.9102 10.8937C33.989 10.8937 34.8633 10.0809 34.8633 9.07807ZM42.6758 9.07807C42.6758 8.07523 41.8015 7.26245 40.7227 7.26245C39.6439 7.26245 38.7695 8.07523 38.7695 9.07807C38.7695 10.0809 39.6439 10.8937 40.7227 10.8937C41.8015 10.8937 42.6758 10.0809 42.6758 9.07807Z"
          fill="white"
        />
        <path
          d="M68.232 40.8164H74.388V25.6244L80.076 40.8164H85.044L90.696 25.6604V40.8164H96.852V15.5444H89.616L82.596 33.0404L75.504 15.5444H68.232V40.8164ZM101.279 40.8164H107.435V20.7284H101.279V40.8164ZM104.375 18.6404C106.535 18.6404 108.011 17.1644 108.011 15.3284C108.011 13.4564 106.535 11.9804 104.375 11.9804C102.179 11.9804 100.703 13.4564 100.703 15.3284C100.703 17.1644 102.179 18.6404 104.375 18.6404ZM118.052 31.4924C118.052 28.0364 119.744 27.0284 122.66 27.0284H124.352V20.5124C121.652 20.5124 119.456 21.9524 118.052 24.0764V20.7284H111.896V40.8164H118.052V31.4924ZM147.131 20.7284H140.975V31.6364C140.975 34.3724 139.463 35.8844 137.087 35.8844C134.783 35.8844 133.235 34.3724 133.235 31.6364V20.7284H127.115V32.4644C127.115 37.8284 130.247 41.0324 134.891 41.0324C137.591 41.0324 139.751 39.8084 140.975 38.0804V40.8164H147.131V20.7284Z"
          fill="white"
        />
      </svg>

      <div className="form__title">
        <h1>Register</h1>
        <p>
          Create account to start using <b>Miru.</b>
        </p>
      </div>

      <Formik
        initialValues={{
          email: "",
          password: "",
          first_name: "",
          last_name: "",
          confirmPassword: "",
        }}
        validationSchema={AUTHENTICATION_REGISTER_SCHEMA}
        onSubmit={handleRegister}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <FormInput
              label="First Name"
              name="first_name"
              type="text"
              placeholder="Enter your first name"
              required
            />
            <FormInput
              label="Last Name"
              name="last_name"
              type="text"
              placeholder="Enter your last name"
              required
            />
            <FormInput
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <FormInput
              label="Password"
              name="password"
              type={showIcon === "show" ? "text" : "password"}
              placeholder="Enter your password"
              icon={showIcon === "show" ? <ToggleIconShow /> : <ToggleIconHidden />}
              handleIconClick={handleIconClick}
              required
            />
            <FormInput
              label="Confirm Password"
              name="confirmPassword"
              type={showIcon === "show" ? "text" : "password"}
              placeholder="Confirm your password"
              icon={showIcon === "show" ? <ToggleIconShow /> : <ToggleIconHidden />}
              handleIconClick={handleIconClick}
              required
            />

            <FormButton
              label={isSubmitting ? <Loader /> : "Register"}
              disabled={isSubmitting}
              type="submit"
              modifierClass="btn__submit"
            />

            <p className="txt--center ">
              You already have an account?{" "}
              <Link to={"/login"} className="txt--underline">
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

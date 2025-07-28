import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

// Components
import FormButton from "../../components/Form/FormButton";
import FormInput from "../../components/Form/FormInput";
import Loader from "../../components/Loader/Loader";

// Interfaces
import { EditAccountValues } from "./interfaces";

// Schemas
import { ACCOUNT_EDIT_SCHEMA } from "../../schemas/AccountSchema";

// Utilities

import handleLogoutUser from "../../utils/handleLogoutUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Icons
import { ReactComponent as ToggleIconHidden } from "../../assets/images/hidden.svg";
import { ReactComponent as ToggleIconShow } from "../../assets/images/shown.svg";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

const Account = () => {
  const [editDetailsFormValues, setEditDetailsFormValues] = useState<EditAccountValues>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /*================
    FILL INPUT FIELDS

  Send a fetch request to get the user details and fill the input fields
  ================*/
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const [first_name = "", last_name = ""] = user.displayName?.split(" ") || [];
    console.log(first_name, last_name, user.displayName);

    const initialData = {
      ...editDetailsFormValues,
      email: user.email || "",
      first_name,
      last_name,
    };

    setEditDetailsFormValues(initialData);
  }, []);

  /*================
    EDIT

  Send a request to edit the user with the provided input and log out if successful 
  ================*/

  const navigate = useNavigate();

  const handleEditUser = async (values: EditAccountValues) => {
    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in to update your account.");
      return;
    }

    try {
      const { email, password, first_name, last_name } = values;

      if (email !== user.email) {
        await updateEmail(user, email);
      }

      if (password) {
        await updatePassword(user, password);
      }

      if (first_name || last_name) {
        const displayName = `${first_name} ${last_name}`.trim();
        await updateProfile(user, { displayName });
      }

      toast.success("Account updated successfully. You'll be redirected.");
      setTimeout(() => {
        handleLogoutUser();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Failed to update account.");
    }
  };

  /*================
  PASSWORD ICON 

   Show or hide the password by clicking on the icon and show the correct icon
  ================*/
  // Controls the icon for the password input
  const [showPasswordIcon, setShowPasswordIcon] = useState<"show" | "hidden">("hidden");

  const handlePasswordIconClick = () => {
    if (showPasswordIcon === "hidden") {
      setShowPasswordIcon("show");
    } else {
      setShowPasswordIcon("hidden");
    }
  };

  // Controls the icon for the confirm password input
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState<"show" | "hidden">(
    "hidden",
  );

  const handleConfirmPasswordIconClick = () => {
    if (showConfirmPasswordIcon === "hidden") {
      setShowConfirmPasswordIcon("show");
    } else {
      setShowConfirmPasswordIcon("hidden");
    }
  };

  return (
    <div className="container">
      <div className="form__title">
        <h1>Edit</h1>
        <p>Edit your account.</p>
      </div>

      {status !== "loading" ? (
        <Formik
          initialValues={editDetailsFormValues}
          enableReinitialize
          validationSchema={ACCOUNT_EDIT_SCHEMA}
          onSubmit={handleEditUser}
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
                placeholder="Enter your password"
                type={showPasswordIcon === "show" ? "text" : "password"}
                icon={showPasswordIcon === "show" ? <ToggleIconShow /> : <ToggleIconHidden />}
                handleIconClick={handlePasswordIconClick}
                required
              />
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={showConfirmPasswordIcon === "show" ? "text" : "password"}
                icon={
                  showConfirmPasswordIcon === "show" ? <ToggleIconShow /> : <ToggleIconHidden />
                }
                handleIconClick={handleConfirmPasswordIconClick}
                required
              />

              <FormButton
                label={isSubmitting ? <Loader /> : "Edit"}
                isDisabled={isSubmitting}
                type="submit"
                modifierClass="btn__form btn__form--submit"
              />
              <FormButton
                label="Back"
                isDisabled={isSubmitting}
                modifierClass="btn__form btn__form--back"
                handleOnClick={() => {
                  navigate("/home");
                }}
              />
            </Form>
          )}
        </Formik>
      ) : (
        <Loader modifierClass="loader--center" />
      )}
    </div>
  );
};
export default Account;

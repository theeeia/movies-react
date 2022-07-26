import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

// Components
import FormButton from "../../components/authenticationForm/FormButton";
import FormInput from "../../components/authenticationForm/FormInput";
import Loader from "../../components/Loader/Loader";
import FormToggleButton from "../../components/authenticationForm/FormToggleButton";

// Interfaces
import { EditAccountValues, EditParameters } from "./interfaces";

// Schemas
import { ACCOUNT_EDIT_SCHEMA } from "../../schemas/AccountSchema";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleLogoutUser from "../../utils/handleLogoutUser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Icons
import { ReactComponent as ToggleIconHidden } from "../../assets/images/hidden.svg";
import { ReactComponent as ToggleIconShow } from "../../assets/images/shown.svg";

export default function Account() {
  const [editDetailsFormValues, setEditDetailsFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const { handleFetch } = handleFetchCall();

  // Fetch the user from api
  const { status, data } = useQuery(["user"], () =>
    handleFetch("https://movies.codeart.mk/api/users/me", "GET", undefined, true),
  );

  /*================
    FILL INPUT FIELDS

  Send a fetch request to get the user details and fill the input fields
  ================*/
  useEffect(() => {
    if (!data || !Object.entries(data).length) return;

    const initialData = {
      ...editDetailsFormValues,
      email: data?.email || "",
      first_name: data?.first_name || "",
      last_name: data?.last_name || "",
      role: data?.role.name || "",
    };
    setEditDetailsFormValues(initialData);

    setToggleUserRole(initialData.role);
  }, [data]);

  /*================
    EDIT

  Send a request to edit the user with the provided input and log out 
  ================*/

  const mutation = useMutation<Response, unknown, EditParameters>(
    editedData => {
      return handleFetch("https://movies.codeart.mk/api/users/me", "PUT", editedData, true);
    },
    {
      onError: (error: any) => {
        toast.error(error);
      },
      onSuccess: async () => {
        toast.success("Edited successfully, you will be logged out");
        setTimeout(() => {
          handleLogoutUser();
        }, 2000);
      },
    },
  );

  const navigate = useNavigate();

  const handleEdit = async (values: EditAccountValues) => {
    const { first_name, password, last_name, email, role } = values;

    mutation.mutate({
      first_name,
      last_name,
      email,
      role,
      ...(password && { password: password }),
    });
  };

  /*================
  ROLE TOGGLE BUTTON 

  Toggles between admin and user role
  ================*/
  const [toggleUserRole, setToggleUserRole] = useState<"user" | "admin">("user");

  const handleToggleRole = () => {
    if (toggleUserRole === "admin") {
      setToggleUserRole("user");
    } else {
      setToggleUserRole("admin");
    }
  };

  /*================
  PASSWORD ICON 

   Show or hide the password by clicking on the icon and show the correct icon
  ================*/
  const [togglePasswordVisibility, setTogglePasswordVisibility] = useState<"show" | "hidden">(
    "hidden",
  );

  const handleIconClick = () => {
    if (togglePasswordVisibility === "hidden") {
      setTogglePasswordVisibility("show");
    } else {
      setTogglePasswordVisibility("hidden");
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
          onSubmit={handleEdit}
        >
          {({ isSubmitting, setFieldValue }) => (
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
                type={togglePasswordVisibility === "show" ? "text" : "password"}
                icon={
                  togglePasswordVisibility === "show" ? <ToggleIconShow /> : <ToggleIconHidden />
                }
                handleIconClick={handleIconClick}
                required
              />
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={togglePasswordVisibility === "show" ? "text" : "password"}
                icon={
                  togglePasswordVisibility === "show" ? <ToggleIconShow /> : <ToggleIconHidden />
                }
                handleIconClick={handleIconClick}
                required
              />
              <div className="form__label">Role</div>

              <Field
                component={FormToggleButton}
                name="role"
                label="User"
                checked={toggleUserRole === "user" ? true : false}
                onChange={() => {
                  handleToggleRole();
                  setFieldValue("role", toggleUserRole === "user" ? "admin" : "user");
                }}
              />
              <Field
                component={FormToggleButton}
                name="role"
                label="Admin"
                checked={toggleUserRole === "admin" ? true : false}
                onChange={() => {
                  handleToggleRole();
                  setFieldValue("role", toggleUserRole === "admin" ? "user" : "admin");
                }}
              />
              <FormButton
                label={isSubmitting ? <Loader /> : "Edit"}
                disabled={isSubmitting}
                type="submit"
                modifierClass="btn__form btn__form--submit"
              />
              <FormButton
                label="Back"
                disabled={isSubmitting}
                modifierClass="btn__form btn__form--back"
                onClick={() => {
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
}

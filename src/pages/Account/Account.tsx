import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Components
import FormButton from "../../components/authenticationForm/FormButton";
import FormInput from "../../components/authenticationForm/FormInput";
import Loader from "../../components/Loader/Loader";
import FormToggleButton from "../../components/authenticationForm/FormToggleButton";

// Interfaces
import { EditAccountValues } from "./interfaces";

// Schemas
import { ACCOUNT_EDIT_SCHEMA } from "../../schemas/AccountSchema";

// Utilities
import handleFetchCall from "../../utils/handleFetchCall";
import handleLogoutUser from "../../utils/handleLogoutUser";

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
  //const [response, setResponse] = useState<AccountValues | null>(null);
  //const [roles, setRoles] = useState([]);

  /*================
    FILL INPUT FIELDS

  Send a fetch request to get the user details and fill the input fields
  ================*/

  useEffect(() => {
    let ignore = false;
    const fetchUser = async () => {
      const response = await handleFetch(
        "https://movies.codeart.mk/api/users/me",
        "GET",
        undefined,
        true,
      );
      const { email, role, first_name, last_name } = response;
      if (!ignore) {
        setEditDetailsFormValues({
          ...editDetailsFormValues,
          email: email,
          first_name: first_name,
          last_name: last_name,
          role: role.name,
        });
      }
    };

    fetchUser();
    return () => {
      ignore = true;
      console.log(editDetailsFormValues);
    };
  }, []);

  useEffect(() => {
    let ignore = false;
    const fetchRoles = async () => {
      const rolesResponse = await handleFetch(
        "https://movies.codeart.mk/api/roles",
        "GET",
        undefined,
        true,
      );

      if (!ignore) {
        //setRoles(rolesResponse);
        console.log(rolesResponse);
        console.log("2");
      }
    };

    fetchRoles();

    return () => {
      ignore = true;
    };
  }, []);
  /*================
    EDIT

  Send a request to edit the user with the provided input and log out 
  ================*/
  const navigate = useNavigate();

  const handleEdit = async (values: EditAccountValues) => {
    const { first_name, password, last_name, email, role } = values;

    const response = await handleFetch(
      "https://movies.codeart.mk/api/users/me",
      "PUT",
      {
        first_name,
        last_name,
        email,
        role,
        ...(password && { password: password }),
      },
      true,
    );
    if (response.error) {
      toast.error("Error");
    } else {
      toast.success("Edited successfully, please relog");
      // Logout user
      handleLogoutUser();
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
      <div className="form__title">
        <h1>Edit</h1>
        <p>Edit your account.</p>
      </div>

      {editDetailsFormValues ? (
        <Formik
          initialValues={editDetailsFormValues}
          enableReinitialize
          validationSchema={ACCOUNT_EDIT_SCHEMA}
          onSubmit={handleEdit}
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
                type={showIcon === "show" ? "text" : "password"}
                icon={showIcon === "show" ? <ToggleIconShow /> : <ToggleIconHidden />}
                handleIconClick={handleIconClick}
                required
              />
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm your password"
                type={showIcon === "show" ? "text" : "password"}
                icon={showIcon === "show" ? <ToggleIconShow /> : <ToggleIconHidden />}
                handleIconClick={handleIconClick}
                required
              />
              <div className="form__label">Role</div>

              <Field
                component={FormToggleButton}
                name="role"
                id="user"
                label="User"
                value="user"
                className="form__toggle__input"
              />

              <Field
                component={FormToggleButton}
                name="role"
                id="admin"
                label="Admin"
                value="admin"
                className="form__toggle__input"
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

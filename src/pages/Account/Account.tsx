import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/authenticationForm/FormButton";
import FormInput from "../../components/authenticationForm/FormInput";
import Loader from "../../components/Loader/Loader";
import { ACCOUNT_EDIT_SCHEMA } from "../../schemas/AccountSchema";
import { AccountValues, EditAccountValues } from "./interfaces";

export default function Account() {
  const navigate = useNavigate();
  const [response, setResponse] = useState<AccountValues | null>(null);
  const access_token = JSON.parse(localStorage.getItem("accessToken") || "");
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("https://movies.codeart.mk/api/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      const res = await response.json();
      setResponse(res);
    };
    fetchUser();
  }, []);

  const handleEdit = async (values: EditAccountValues) => {
    const { confirmPassword, ...data } = values;
    const response = await fetch("https://movies.codeart.mk/api/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res);
    console.log(confirmPassword);
  };

  return (
    <div className="container">
      <div className="form__title">
        <h1>Edit</h1>
        <p>Edit your account.</p>
      </div>
      {response != null && (
        <Formik
          initialValues={{
            email: response.email,
            password: "",
            first_name: response.first_name,
            last_name: response.last_name,
            confirmPassword: "",
            role: "admin",
          }}
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
                type="password"
                placeholder="Enter your password"
                required
              />
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                required
              />

              <FormButton
                label={isSubmitting ? <Loader /> : "Edit"}
                disabled={isSubmitting}
                type="submit"
                modifierClass="btn__submit"
              />
            </Form>
          )}
        </Formik>
      )}
      <button
        className="button"
        onClick={() => {
          navigate("/home");
        }}
      >
        Back
      </button>
    </div>
  );
}

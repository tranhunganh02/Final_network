import React, { useState } from "react";
import { useFormik } from "formik";
import "./Form.css";
import SignForm from "./RegisterPage";

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Must be 8 characters or greater";
  }

  return errors;
};

const LogForm = () => {
  const [form, setForm] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        // Make a POST request to your login endpoint using fetch
        const response = await fetch("http://localhost:3002/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        // Parse the JSON response
        const data = await response.json();

        // Check if the request was successful
        if (response.ok) {
          console.log("Login successful", data);
        } else {
          console.error("Login failed", data);
        }
      } catch (error) {
        // Handle any other errors
        console.error("Error during login", error);
      }
    },
  });
  return (
    <>
      {form ? (
        <SignForm></SignForm>
      ) : (
        <div className="div-center "  
        style={{
          minWidth: 400,
        }}>
          <fieldset>
            <legend>
              <h1  className="text-center mb-4"> Sign In Here! </h1>
            </legend>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>

                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter valid email address"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <div className="invalid-feedback d-block">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="password">
                  Password
                </label>

                <input
                  className="form-control"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                />
                {formik.errors.password ? (
                  <div className="invalid-feedback d-block">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className="text-center mt-3">
              Do not have account ?{" "}
              <a className="text-underline" onClick={() => setForm(true)}>Register</a>
            </p>
           
          </fieldset>
        </div>
      )}
    </>
  );
};

export default LogForm;

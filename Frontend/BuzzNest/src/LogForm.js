import React, { useState } from "react";
import { useFormik } from "formik";
import "./Form.css";
import SignForm from "./SignForm";

const validate = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = "Required";
  } else if (values.userName.length > 15) {
    errors.userName = "Must be 15 characters or less";
  }

  if (!values.city) {
    errors.city = "Required";
  } else if (values.city.length > 20) {
    errors.city = "Must be 20 characters or less";
  }

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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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

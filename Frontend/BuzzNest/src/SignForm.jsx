import React, { useState } from "react";
import { useFormik } from "formik";
import "./Form.css";
import LogForm from "./LogForm";

const validate = (values) => {
  const errors = {};
  if (!values.userName) {
    errors.userName = "Required";
  } else if (values.userName.length > 15) {
    errors.userName = "Must be 15 characters or less";
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

const Form = () => {
  const [form, setForm] = useState(false);
  const formik = useFormik({
    initialValues: {
      userName: "",

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
        <LogForm></LogForm>
      ) : (
        <div
          className=" "
          style={{
            minWidth: 400,
          }}
        >
          <fieldset>
            <legend>
              <h1 className="text-center mb-4"> Sign Up Here! </h1>
            </legend>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="userName">
                  User Name
                </label>

                <input
                  className="form-control"
                  id="userName"
                  name="userName"
                  type="useName"
                  placeholder="Enter UserName"
                  onChange={formik.handleChange}
                  value={formik.values.userName}
                />
                {formik.errors.userName ? (
                  <div className="invalid-feedback d-block">{formik.errors.userName}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label className="form-label"  htmlFor="email">Email Address</label>

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
                  <div className="invalid-feedback d-block">{formik.errors.email}</div>
                ) : null}
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="password">Password</label>

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
                  <div className="invalid-feedback d-block">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">Register</button>
              </div>
            </form>
            <p className="text-center mt-3">
              Already have an account ?{" "}
              <a className="text-underline" onClick={() => setForm(true)}>Login</a>
            </p>
          </fieldset>
        </div>
      )}
    </>
  );
};

export default Form;

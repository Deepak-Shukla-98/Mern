import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { signUp } from "../services/axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const data = {
    email: "",
    password: "",
    username: "",
    cnfpwd: "",
  };
  const navigate = useNavigate();
  const validation = Yup.object().shape({
    username: Yup.string().required("User name is requierd"),
    email: Yup.string().required("Email is requierd"),
    password: Yup.string().required("Password is requierd"),
  });
  const sign_Up = async (values) => {
    if (!!values.cnfpwd && values.cnfpwd === values.password) {
      await signUp({
        username: values.username,
        email: values.email,
        password: values.password,
      });
    }
    navigate("/login");
  };
  return (
    <div className="container-fluid bg-dark">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="col-md-4 shadow-lg p-3">
          <h1 className="text-white">Sign In</h1>
          <div className="card">
            <div className="card-body">
              <Formik
                initialValues={data}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    sign_Up(values);
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                  isSubmitting,
                }) => (
                  <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        name="username"
                        value={values.username}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <small className="text-danger">
                        {errors.username && touched.username && errors.username}
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Email address</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <small className="text-danger">
                        {errors.email && touched.email && errors.email}
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <small className="text-danger">
                        {errors.password && touched.password && errors.password}
                      </small>
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input
                        className="form-control"
                        type="password"
                        name="cnfpwd"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.cnfpwd}
                      />
                      <small className="text-danger">
                        {values.cnfpwd !== values.password
                          ? "Password doesn't match"
                          : ""}
                      </small>
                    </div>
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        className="btn btn-sm btn-primary mx-2"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

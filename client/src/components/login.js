import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { signIn } from "../services/axios";
import { useNavigate } from "react-router-dom";
import { useSharedContext } from "../context/sharedContext";
import { GoogleLogin } from "@react-oauth/google";
import bg from "../asset/bg.png";
import logo from "../asset/logo.png";

function Login() {
  const { dispatch } = useSharedContext();
  const data = {
    email: "",
    password: "",
    username: "",
    cnfpwd: "",
  };
  const navigate = useNavigate();

  const validation = Yup.object().shape({
    email: Yup.string().required("Email is requierd"),
    password: Yup.string().required("Password is requierd"),
  });

  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  const login = async (values) => {
    let res = await signIn({ email: values.email, password: values.password });
    if (!!res?.data?.token) {
      dispatch({
        type: "SET_AUTH_STATE",
        payload: true,
      });
      dispatch({
        type: "SET_LOGIN_USER",
        payload: res.data.user,
      });
      localStorage.setItem("token", `Bearer ${res.data.token}`);
      navigate("/home");
    }
  };
  return (
    <div className="overflow-hidden" style={{ height: "95vh" }}>
      <div className="row d-flex justify-content-end align-items-end">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-6"></div>
            <div className="col-md-6 mb-4 p-4">
              <h4 className="text-primary" style={{ fontWeight: "700" }}>
                Welcome Back!!
              </h4>
              <b className="mb-3 text-secondary mb-3">
                Enter your email and password to sign in
              </b>
              <Formik
                initialValues={data}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    login(values);
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <span className="text-danger">
                        {errors.email && touched.email && errors.email}
                      </span>
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
                      <span className="text-danger">
                        {errors.password && touched.password && errors.password}
                      </span>
                    </div>
                    <div class="form-check form-switch">
                      <input
                        className="form-check-input mt-2"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Remember me
                      </label>
                    </div>
                    <button
                      className="form-control btn btn-sm btn-primary rounded-3"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      <small className="font-weight-bold text-white">
                        <b>SIGN IN</b>
                      </small>
                    </button>
                    <div className="text-center text-secondary">
                      <p>
                        Dont have an account?{" "}
                        <span
                          className="text-primary cursor-pointer"
                          onClick={() => {
                            navigate("/signUp");
                          }}
                          style={{ fontSize: "2vh" }}
                        >
                          Sign Up
                        </span>
                      </p>
                    </div>
                    {/* <div className="d-flex justify-content-center">
                      <GoogleLogin
                        type="icon"
                        shape="circle"
                        onSuccess={responseMessage}
                        onError={errorMessage}
                      />
                    </div> */}
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-2"></div>
            <div
              className="col-md-10 border rounded-bottom-right bg-primary"
              style={{ position: "relative" }}
            >
              <img src={bg} alt="" style={{ height: "80vh", width: "100%" }} />
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  right: "-50px",
                  zIndex: 1,
                }}
              >
                <img
                  src={bg}
                  alt=""
                  style={{
                    height: "80vh",
                    width: "100%",
                    transform: "rotate(180deg)",
                  }}
                />
              </div>
              <img
                src={logo}
                alt=""
                style={{
                  transform: "scale(0.53)",
                  position: "absolute",
                  top: "50%",
                  left: "17%",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;

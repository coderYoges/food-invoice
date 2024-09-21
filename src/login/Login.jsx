import React from "react";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { isEmpty } from "lodash";
import { PageTitles } from "../config/constants";
import { FaRegUser, FaLock } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../redux/reducer";

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  background-image: linear-gradient(to right, #f12711, #f5af19);
  height: 100vh;
  width: 100vw;
  font-family: "Roboto", sans-serif;
`;

const LoginBoxStyled = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 15px;
  margin: auto;
`;

const LoginTitle = styled.h1`
  color: #fff;
  font-size: 2rem;
  margin-bottom: 1rem;
  line-height: 1.2;
  word-spacing: 0.2rem;
  font-weight: 500;
  user-select: none;
`;

const UserIconStyle = styled(FaRegUser)`
  width: 60px;
  height: 3rem;
  background: #ffffff70;
  color: #f8f9fa;
  padding: 1rem;
  font-size: 18px;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`;

const PasswordIconStyle = styled(FaLock)`
  width: 60px;
  height: 3rem;
  background: #ffffff70;
  color: #f8f9fa;
  padding: 1rem;
  font-size: 18px;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`;

const SignupSchema = Yup.object().shape({
  username: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string()
    .min(4, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
});

const LoginPage = ({ setAuth }) => {
  const navigate = useNavigate();
  return (
    <LoginWrapper>
      <LoginBoxStyled>
        <div className="text-center">
          <img
            src={require("../assets/images/invoice-icon.png")}
            alt="image-01"
            width={150}
            height={150}
          />
          <LoginTitle>{PageTitles.LOGIN}</LoginTitle>
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={SignupSchema}
          onSubmit={async (values, actions) => {
            signInWithEmailAndPassword(auth, values.username, values.password)
              .then((userCreditionals) => setAuth(true))
              .then(() => navigate("/home", { replace: true }))
              .catch((error) => alert("Incorrect username or password"));
            actions.resetForm();
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className="mt-4" autoComplete="off">
              <div className="input-group uf-input-group input-group-lg mb-3">
                <UserIconStyle />
                <Field
                  type="email"
                  name="username"
                  className="form-control"
                  placeholder="Username"
                  autoComplete="off"
                />
              </div>

              <div className="input-group uf-input-group input-group-lg mb-3">
                <PasswordIconStyle />
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  autoComplete="off"
                />
              </div>
              <div className="d-grid mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || !isEmpty(errors)}
                  className="btn uf-btn-primary btn-lg"
                >
                  {isSubmitting ? (
                    <div
                      className="spinner-border text-light"
                      role="status"
                    ></div>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </LoginBoxStyled>
    </LoginWrapper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setAuth: setAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

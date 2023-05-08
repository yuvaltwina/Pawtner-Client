import "./LoginPage.css";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Navigate } from "../../../utils/types/type";
import { SERVER_URL } from "../../../utils/data/data";
import axios from "axios";
import { useGlobalContext } from "../../../hooks/useContext";
import Cookies from "js-cookie";
const LOGIN_BUTTON_TEXT = "LOGIN";
const SIGN_UP_TEXT = "Need an account?";

function LoginPage({
  navigate,
  closeModal,
}: {
  navigate: Navigate;
  closeModal: () => void;
}) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState({
    isError: false,
    errorMessage: "",
  });

  const [isSubmiting, setIsSubmiting] = useState(false);
  const { setUserDetails } = useGlobalContext();

  const { email, password } = loginData;

  const onChange = ({
    target: { value, id },
  }: {
    target: { value: string; id: string };
  }) => {
    setLoginData((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      const loginResponse = await axios.post(SERVER_URL + "/user/login", {
        email,
        password,
      });
      const resMessage = loginResponse.data?.message;

      if (resMessage === "Successfully logged in") {
        const {
          loginToken,
          userFrontDetails: { username, email },
        } = loginResponse.data.data;
        Cookies.set("login", loginToken, { expires: 7 });
        setUserDetails({ username, email, isLoggedIn: true });
        closeModal();
      }
      setIsSubmiting(false);
    } catch (err: any) {
      const resMessage = err.response?.data?.message;
      let errorMessage = "Something went wrong please try again later";
      if (resMessage === "unauthorized") {
        errorMessage = "Wrong email or password";
      }
      if (resMessage === "not verified") {
        errorMessage = "User not verified";
      }
      setLoginError({
        isError: true,
        errorMessage,
      });
      setIsSubmiting(false);
      return;
    }
  };

  return (
    <div className="login-modal-page">
      <h1 className="login-modal-headline">Login</h1>
      <form className="login-modal-form" onSubmit={handleSubmit}>
        <TextField
          type="email"
          id="email"
          label="Email"
          className="login-modal-input"
          error={loginError.isError}
          value={email}
          onChange={onChange}
          autoComplete="on"
          required
        />
        <TextField
          id="password"
          type="password"
          label="Password"
          error={loginError.isError}
          className="login-modal-input"
          value={password}
          onChange={onChange}
          autoComplete="off"
          required
        />
        <p className="login-modal-error-message">{loginError.errorMessage}</p>
        <button
          type="submit"
          disabled={isSubmiting}
          className="login-modal-submit"
        >
          {LOGIN_BUTTON_TEXT}
        </button>
      </form>
      <button
        className="login-modal-button-link-design"
        onClick={() => {
          navigate.toForgorPasswordPage();
        }}
      >
        forgot password?
      </button>
      <span className="login-modal-sign-up">
        <p>{SIGN_UP_TEXT}</p>
        <button
          className="login-modal-button-link-design"
          onClick={() => {
            navigate.toSignupPage();
          }}
        >
          Sign Up
        </button>
      </span>
    </div>
  );
}

export default LoginPage;

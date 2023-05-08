import React, { useState, useEffect } from "react";
import "./SignUpPage.css";
import TextField from "@mui/material/TextField";
import { Navigate } from "../../../utils/types/type";
import {
  EMAIL_REGEX,
  SERVER_URL,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_REGEX,
} from "../../../utils/data/data";
import { toast } from "react-hot-toast";
import axios from "axios";

const ISRAEL_ZIP_CODE_REGEX = /^\d{7}$/;
const USER_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/; //allows only letters and numbers in the string, and the first character must be a letter 4-12 charcters.
const USER_NAME_ERROR_MESSAGE =
  " Only letters and numbers, first character must be a letter. 4-12 charcters long";
const PASSWORD_ERROR_MESSAGE =
  " Atleast 8 characters , Needs to contain letters and numbers.";
const CONFIRM_PASSWORD_ERROR_MESSAGE = "Passwords not match";
const USER_NAME_ERROR = "usernameError";
const PASSWORD_ERROR = "passwordError";
const CONFIRM_PASSWORD_ERROR = "confirmPasswordError";
const EMAIL_ERROR = "emailError";
const ZIP_CODE_ERROR = "zipCodeError";
const ZIP_CODE_ERROR_MESSAGE = "Please provide valid israel ZIP code";

function SignUpPage({
  navigate,
  closeModal,
}: {
  navigate: Navigate;
  closeModal: () => void;
}) {
  const [signUpData, setsignUpData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    zipCode: "",
  });
  const [signUpError, setsignUpError] = useState({
    usernameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    zipCodeError: false,
    errorMessage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { username, email, password, confirmPassword, zipCode } = signUpData;
  const {
    usernameError,
    emailError,
    passwordError,
    confirmPasswordError,
    zipCodeError,
    errorMessage,
  } = signUpError;

  const ChangesignUpErrorTo = (category: string, errorText: string) => {
    setsignUpError({
      usernameError: category === USER_NAME_ERROR ? true : false,
      passwordError: category === PASSWORD_ERROR ? true : false,
      emailError: category === EMAIL_ERROR ? true : false,
      confirmPasswordError: category === CONFIRM_PASSWORD_ERROR ? true : false,
      zipCodeError: category === ZIP_CODE_ERROR ? true : false,
      errorMessage: errorText,
    });
  };
  const validateSignUpData = () => {
    if (!username.match(USER_NAME_REGEX)) {
      ChangesignUpErrorTo(USER_NAME_ERROR, USER_NAME_ERROR_MESSAGE);
      return false;
    }
    if (!email.match(EMAIL_REGEX)) {
      ChangesignUpErrorTo(EMAIL_ERROR, EMAIL_ERROR_MESSAGE);
      return false;
    }
    if (!password.match(PASSWORD_REGEX)) {
      ChangesignUpErrorTo(PASSWORD_ERROR, PASSWORD_ERROR_MESSAGE);
      return false;
    }
    if (!(confirmPassword === password)) {
      ChangesignUpErrorTo(
        CONFIRM_PASSWORD_ERROR,
        CONFIRM_PASSWORD_ERROR_MESSAGE
      );
      return false;
    }
    if (!zipCode.match(ISRAEL_ZIP_CODE_REGEX)) {
      ChangesignUpErrorTo(ZIP_CODE_ERROR, ZIP_CODE_ERROR_MESSAGE);
      return false;
    }
    ChangesignUpErrorTo("no error", "");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValidate = validateSignUpData();
    if (!isValidate) {
      setIsSubmitting(false);
      return;
    }
    try {
      const verificationEmailResponse = await axios.post(
        SERVER_URL + "/user/verification",
        { username, password, email }
      );
      const serverVerified =
        verificationEmailResponse.data?.message ===
        "verification email sent susscefully";

      if (serverVerified) {
        toast.success("Verification mail sent to your email");
        setsignUpData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          zipCode: "",
        });
        closeModal();
      }
    } catch (err: any) {
      const serverError = err.response?.data?.message || "";
      if (serverError === "Username already exists") {
        ChangesignUpErrorTo(USER_NAME_ERROR, serverError);
        setIsSubmitting(false);
        return;
      }
      if (serverError === "Email already exists") {
        ChangesignUpErrorTo(EMAIL_ERROR, serverError);
        setIsSubmitting(false);
        return;
      }
      toast.error("Something went wrong please try again later");
      setIsSubmitting(false);
      return;
    }
  };

  const onChange = ({
    target: { value, id },
  }: {
    target: { value: string; id: string };
  }) => {
    setsignUpData((prevState) => ({ ...prevState, [id]: value }));
  };

  return (
    <div className="signup-modal-page">
      <h1 className="signup-modal-headline">Sign Up</h1>
      <form className="signup-modal-form" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          error={usernameError}
          helperText={usernameError ? errorMessage : ""}
          value={username}
          onChange={onChange}
          id="username"
          label="User Name"
          className="signup-modal-input"
          autoComplete="on"
          required
        ></TextField>
        <TextField
          error={emailError}
          helperText={emailError ? errorMessage : ""}
          value={email}
          onChange={onChange}
          id="email"
          type="email"
          label="Email"
          className="signup-modal-input"
          autoComplete="on"
          required
        ></TextField>
        <TextField
          error={passwordError}
          helperText={passwordError ? errorMessage : ""}
          value={password}
          onChange={onChange}
          id="password"
          type="password"
          label="Password"
          className="signup-modal-input"
          autoComplete="off"
          required
        ></TextField>
        <TextField
          error={confirmPasswordError}
          helperText={confirmPasswordError ? errorMessage : ""}
          value={confirmPassword}
          onChange={onChange}
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          className="signup-modal-input"
          autoComplete="off"
          required
        ></TextField>
        <TextField
          error={zipCodeError}
          helperText={zipCodeError ? errorMessage : ""}
          value={zipCode}
          onChange={onChange}
          id="zipCode"
          label="ZIP Code"
          className="signup-modal-input"
          autoComplete="on"
          required
        ></TextField>

        <button
          type="submit"
          className="signup-modal-submit"
          disabled={isSubmitting}
        >
          SUBMIT
        </button>
      </form>

      <span className="signup-modal-login">
        <p>Already have an account?</p>
        <button
          className="signup-modal-button-link-design"
          onClick={() => {
            navigate.toLoginPage();
          }}
        >
          Login
        </button>
      </span>
    </div>
  );
}

export default SignUpPage;

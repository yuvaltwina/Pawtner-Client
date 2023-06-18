import React, { useState } from 'react';
import './SignUpPage.css';
import TextField from '@mui/material/TextField';
import { Navigate } from '../../../../utils/types/type';
import {
  EMAIL_REGEX,
  EMAIL_ERROR_MESSAGE,
  PASSWORD_REGEX,
} from '../../../../utils/data/data';
import { toast } from 'react-hot-toast';
import usePostMutation from '../../../../hooks/queryCustomHooks/post/usePostMutation';
const PHONE_NUMBER_REGEX = /^[0-9]{10}$/;
const USER_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,11}$/; //allows only letters and numbers in the string, and the first character must be a letter 4-12 charcters.
const USER_NAME_ERROR_MESSAGE =
  ' Only letters and numbers, first character must be a letter. 4-12 charcters long';
const PASSWORD_ERROR_MESSAGE =
  ' Atleast 8 characters , Needs to contain letters and numbers.';
const CONFIRM_PASSWORD_ERROR_MESSAGE = 'Passwords not match';
const PHONE_NUMBER_ERROR_MESSAGE = 'Please provide a valid phone number';
const USER_NAME_ERROR = 'usernameError';
const PASSWORD_ERROR = 'passwordError';
const CONFIRM_PASSWORD_ERROR = 'confirmPasswordError';
const EMAIL_ERROR = 'emailError';
const PHONE_NUMBER_ERROR = 'phoneNumberError';
const INITIAL_DATA_LIST = {
  username: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

interface PropsType {
  navigate: Navigate;
  closeModal: () => void;
}

function SignUpPage({ navigate, closeModal }: PropsType) {
  const [signUpData, setsignUpData] = useState(INITIAL_DATA_LIST);
  const [signUpError, setsignUpError] = useState({
    usernameError: false,
    emailError: false,
    passwordError: false,
    phoneNumberError: false,
    confirmPasswordError: false,
    errorMessage: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { username, email, password, phoneNumber, confirmPassword } =
    signUpData;
  const {
    usernameError,
    emailError,
    passwordError,
    phoneNumberError,
    confirmPasswordError,
    errorMessage,
  } = signUpError;

  const ChangesignUpErrorTo = (category: string, errorText: string) => {
    setsignUpError({
      usernameError: category === USER_NAME_ERROR ? true : false,
      passwordError: category === PASSWORD_ERROR ? true : false,
      emailError: category === EMAIL_ERROR ? true : false,
      phoneNumberError: category === PHONE_NUMBER_ERROR ? true : false,
      confirmPasswordError: category === CONFIRM_PASSWORD_ERROR ? true : false,
      errorMessage: errorText,
    });
  };
  const validateSignUpData = () => {
    if (!username.match(USER_NAME_REGEX)) {
      ChangesignUpErrorTo(USER_NAME_ERROR, USER_NAME_ERROR_MESSAGE);
      return false;
    }
    if (!phoneNumber.match(PHONE_NUMBER_REGEX)) {
      ChangesignUpErrorTo(PHONE_NUMBER_ERROR, PHONE_NUMBER_ERROR_MESSAGE);
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
    ChangesignUpErrorTo('no error', '');
    return true;
  };

  const onSuccsessSignUp = (loadingToast: string) => {
    toast.success('Verification mail sent to your email', { id: loadingToast });
    setsignUpData(INITIAL_DATA_LIST);
    closeModal();
  };
  const onErrorSignUp = (error: any, loadingToast: string) => {
    const serverError = error.response?.data?.message || '';
    if (serverError === 'Username already exists') {
      toast.dismiss(loadingToast);
      ChangesignUpErrorTo(USER_NAME_ERROR, serverError);
      return;
    }
    if (serverError === 'Email already exists') {
      toast.dismiss(loadingToast);
      ChangesignUpErrorTo(EMAIL_ERROR, serverError);
      return;
    }
    toast.error('Something went wrong please try again later', {
      id: loadingToast,
    });
  };
  const { sendVerificationEmailMutation } = usePostMutation(
    onSuccsessSignUp,
    onErrorSignUp
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isValidate = validateSignUpData();
    if (!isValidate) {
      setIsSubmitting(false);
      return;
    }
    sendVerificationEmailMutation.mutate({
      username,
      password,
      email,
      phoneNumber,
    });
    setIsSubmitting(false);
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
          helperText={usernameError ? errorMessage : ''}
          value={username}
          onChange={onChange}
          id="username"
          label="User Name"
          className="signup-modal-input"
          autoComplete="on"
          required
        ></TextField>
        <TextField
          error={phoneNumberError}
          helperText={phoneNumberError ? errorMessage : ''}
          value={phoneNumber}
          onChange={onChange}
          id="phoneNumber"
          label="Phone Number"
          className="signup-modal-input"
          autoComplete="on"
          required
        ></TextField>
        <TextField
          error={emailError}
          helperText={emailError ? errorMessage : ''}
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
          helperText={passwordError ? errorMessage : ''}
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
          helperText={confirmPasswordError ? errorMessage : ''}
          value={confirmPassword}
          onChange={onChange}
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          className="signup-modal-input"
          autoComplete="off"
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

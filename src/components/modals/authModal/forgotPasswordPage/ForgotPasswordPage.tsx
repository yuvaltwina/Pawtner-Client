import './ForgotPasswordPage.css';

import { EMAIL_ERROR_MESSAGE, EMAIL_REGEX } from '../../../../utils/data/data';
import React, { useState } from 'react';

import { Navigate } from '../../../../utils/types/type';
import TextField from '@mui/material/TextField';
import { toast } from 'react-hot-toast';
import usePostMutation from '../../../../hooks/queryCustomHooks/post/usePostMutation';

function ForgotPasswordPage({ navigate }: { navigate: Navigate }) {
  const [forgotPasswordData, setforgotPasswordData] = useState({
    email: '',
  });
  const [emailError, setEmailError] = useState(false);
  const [isSubmiting, setisSubmiting] = useState(false);
  const { email } = forgotPasswordData;

  const onChange = ({
    target: { value, id },
  }: {
    target: { value: string; id: string };
  }) => {
    setforgotPasswordData((prevState) => ({ ...prevState, [id]: value }));
  };

  const validateForgotPasswordData = () => {
    if (!email.match(EMAIL_REGEX)) {
      setEmailError(true);
      return false;
    } else {
      setEmailError(false);
      return true;
    }
  };
  const onSuccsessChangePassword = (loadingToast: string) => {
    toast.success('Reset link has been sent to this email', {
      id: loadingToast,
    });
  };
  const onErrorChangePassword = (error: any, loadingToast: string) => {
    const errorMessage = error.response?.data?.message;
    if (errorMessage) {
      toast.error(errorMessage, {
        id: loadingToast,
      });
    } else {
      toast.error('Something went wrong', {
        id: loadingToast,
      });
    }
  };
  const { sendForgotPasswordEmailMutation } = usePostMutation(
    onSuccsessChangePassword,
    onErrorChangePassword
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmiting(true);
    const isValidate = validateForgotPasswordData();
    if (!isValidate) {
      setisSubmiting(false);
      return;
    }
    sendForgotPasswordEmailMutation.mutate(email);
    setisSubmiting(false);
    setforgotPasswordData({ email: '' });
  };
  return (
    <div className="forgot-modal-page">
      <h1 className="forgot-modal-headline">Forgot Your Password?</h1>
      <form className="forgot-modal-form" onSubmit={handleSubmit}>
        <TextField
          type="email"
          id="email"
          label="Email"
          className="forgot-modal-input"
          error={emailError}
          helperText={emailError ? EMAIL_ERROR_MESSAGE : ''}
          value={email}
          autoComplete="on"
          onChange={onChange}
          required
        ></TextField>
        <button
          type="submit"
          className="signup-modal-submit"
          disabled={isSubmiting}
        >
          RESET
        </button>
      </form>
      <span className="forgot-modal-login">
        <p>Remember your password?</p>
        <button
          className="forgot-modal-button-link-design"
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

export default ForgotPasswordPage;

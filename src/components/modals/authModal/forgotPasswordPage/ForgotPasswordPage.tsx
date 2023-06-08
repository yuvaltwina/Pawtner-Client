import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import './ForgotPasswordPage.css';
import { Navigate } from '../../../../utils/types/type';
import {
  EMAIL_REGEX,
  EMAIL_ERROR_MESSAGE,
  SERVER_URL,
} from '../../../../utils/data/data';
import { toast } from 'react-hot-toast';
import axios from 'axios';

function ForgotPasswordPage({ navigate }: { navigate: Navigate }) {
  const [forgotPasswordData, setforgotPasswordData] = useState({
    email: '',
  });
  const { email } = forgotPasswordData;

  const [emailError, setEmailError] = useState(false);
  const [isSubmiting, setisSubmiting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmiting(true);
    const isValidate = validateForgotPasswordData();
    if (!isValidate) {
      setisSubmiting(false);
      return;
    }
    setisSubmiting(false);
    try {
      const loginResponse = await axios.post(
        SERVER_URL + '/user/forgotPassword',
        {
          email,
        }
      );
      const resMessage = loginResponse.data?.message;
      if (resMessage === 'Email sent successfully') {
        toast.success('Reset link has been sent to this email');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message;
      if (errorMessage) {
        toast.error(errorMessage); //האם זה בסדר להודיע לכולם אם אימייל מסויים רשום או לא?
      } else {
        toast.error('Something went wrong');
      }
    }
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

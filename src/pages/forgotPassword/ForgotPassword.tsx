import React from 'react';
import { useState } from 'react';
import './ForgotPassword.css';
import TextField from '@mui/material/TextField';
import { PASSWORD_REGEX } from '../../utils/data/data';
import { toast } from 'react-hot-toast';
import useUpdateMutation from '../../hooks/queryCustomHooks/update/useUpdateMutation';

const CONFIRMPASS_ERROR_MESSAGE = 'Passwords not match';
const PASSWORD_ERROR_MESSAGE =
  ' Atleast 8 characters , Needs to contain letters and numbers.';
const params = new URLSearchParams(window.location.search);
const token = params.get('token');

function ForgotPassword() {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [data, setData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({
    newPassordErr: '',
    confirmPasswordErr: '',
  });
  const { newPassword, confirmPassword } = data;
  const onChange = ({
    target: { value, id },
  }: {
    target: { value: string; id: string };
  }) => {
    setData((prevState) => ({ ...prevState, [id]: value }));
  };

  const validateData = () => {
    if (!newPassword.match(PASSWORD_REGEX)) {
      setErrors({
        newPassordErr: PASSWORD_ERROR_MESSAGE,
        confirmPasswordErr: '',
      });
      return false;
    }
    if (newPassword !== confirmPassword) {
      setErrors({
        newPassordErr: '',
        confirmPasswordErr: CONFIRMPASS_ERROR_MESSAGE,
      });
      return false;
    }
    setErrors({
      newPassordErr: '',
      confirmPasswordErr: '',
    });
    return true;
  };

  const onSuccsessChangePassword = (loadingToast: string) => {
    toast.success('Password changed!', { id: loadingToast });
  };

  const onErrorChangePassword = (error: any, loadingToast: string) => {
    const errorMessage = error.response?.data?.message;
    if (!errorMessage) {
      toast.error('Something went wrong', { id: loadingToast });
    } else {
      toast.error(errorMessage, { id: loadingToast });
    }
  };
  const { changePasswordMutation } = useUpdateMutation(
    onSuccsessChangePassword,
    onErrorChangePassword
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);
    if (!validateData()) {
      setIsSubmiting(false);
      return;
    }
    if (!token || typeof token !== 'string') {
      toast.error('token not valid');
      setIsSubmiting(false);
      return;
    }
    changePasswordMutation.mutate({ token, newPassword });
    setData({
      newPassword: '',
      confirmPassword: '',
    });
    setIsSubmiting(false);
  };
  const { confirmPasswordErr, newPassordErr } = errors;
  return (
    <div className="forpass-header">
      <div className="forpass-container">
        <h1 className="forpass-headline"> Pawtner</h1>
        <h3 className="forpass-sub-title"> change password</h3>
        <form className="forpass-form" onSubmit={handleSubmit}>
          <TextField
            id="newPassword"
            type="password"
            label="New Password"
            className="forpass-input"
            error={Boolean(newPassordErr)}
            value={data.newPassword}
            onChange={onChange}
            helperText={Boolean(newPassordErr) && newPassordErr}
            autoComplete="off"
            required
          />
          <TextField
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            className="forpass-input"
            error={Boolean(confirmPasswordErr)}
            value={data.confirmPassword}
            autoComplete="off"
            onChange={onChange}
            helperText={Boolean(confirmPasswordErr) && confirmPasswordErr}
            required
          />
          <button
            type="submit"
            disabled={isSubmiting}
            className="forpass-submit-button"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;

import React, { useState } from 'react';
import './LoginPage.css';
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import Cookies from 'js-cookie';
import { Navigate } from '../../../../utils/types/type';
import TextField from '@mui/material/TextField';
import { useGlobalContext } from '../../../../hooks/useContext';
import usePostMutation from '../../../../hooks/queryCustomHooks/post/usePostMutation';
import { InputAdornment } from '@mui/material';
import { Visibility } from '@material-ui/icons';

const LOGIN_BUTTON_TEXT = 'LOGIN';
const SIGN_UP_TEXT = 'Need an account?';

interface PropsType {
  navigate: Navigate;
  closeModal: () => void;
}
type OnChangeProps = { target: { value: string; id: string } };

function LoginPage({ navigate, closeModal }: PropsType) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState({
    isError: false,
    errorMessage: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isSubmiting, setIsSubmiting] = useState(false);
  const { setUserDetails } = useGlobalContext();

  const { email, password } = loginData;

  const onSuccessLogin = (data: any) => {
    const {
      loginToken,
      userFrontDetails: { username, email, phoneNumber },
    } = data?.data?.data;
    Cookies.set('login', loginToken, { expires: 7 });
    setUserDetails({ username, email, phoneNumber, isLoggedIn: true });
    closeModal();
  };
  const onErrorLogin = (error: any) => {
    const resMessage = error.response?.data?.message;
    let errorMessage = 'Something went wrong please try again later';
    if (resMessage === 'unauthorized') {
      errorMessage = 'Wrong email or password';
    }
    if (resMessage === 'not verified') {
      errorMessage = 'User not verified';
    }
    setLoginError({
      isError: true,
      errorMessage,
    });
  };
  const { checkLoginDetailsMutation } = usePostMutation(
    onSuccessLogin,
    onErrorLogin
  );
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);
    checkLoginDetailsMutation.mutate({ email, password });
    setIsSubmiting(false);
    return;
  };

  const onChange = ({ target: { value, id } }: OnChangeProps) => {
    setLoginData((prevState) => ({ ...prevState, [id]: value }));
  };

  const displayEyeIcon = () => {
    const iconclassName = 'login-modal-eye-icon';
    const iconOnClick = () => setIsPasswordVisible(!isPasswordVisible);
    return isPasswordVisible ? (
      <AiOutlineEye className={iconclassName} onClick={iconOnClick} />
    ) : (
      <AiOutlineEyeInvisible className={iconclassName} onClick={iconOnClick} />
    );
  };
  const showPassword = isPasswordVisible ? 'text' : 'password';
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
          type={showPassword}
          label="Password"
          error={loginError.isError}
          className="login-modal-input"
          value={password}
          onChange={onChange}
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{displayEyeIcon()}</InputAdornment>
            ),
          }}
          required
        />
        {/* </span> */}
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

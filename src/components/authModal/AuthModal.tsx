import { useEffect, useState } from "react";
import "./AuthModal.css";
import Modal from "@mui/material/Modal";
import ForgotPasswordPage from "./forgotPasswordPage/ForgotPasswordPage";
import LoginPage from "./loginPage/LoginPage";
import SignUpPage from "./signUpPage/SignUpPage";
import { RiCloseFill } from "react-icons/ri";

const FORGOT_PASSWORD = "forgotPassword";
const SIGN_UP = "signUp";
const LOGIN = "login";

export default function BasicModal({
  isLoginModal,
  setIsLoginModal,
}: {
  isLoginModal: boolean;
  setIsLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [modalPage, setModalPage] = useState(LOGIN);

  const navigate = {
    toForgorPasswordPage: () => setModalPage(FORGOT_PASSWORD),
    toSignupPage: () => setModalPage(SIGN_UP),
    toLoginPage: () => setModalPage(LOGIN),
  };
  const closeModal = () => {
    setIsLoginModal(false);
  };
  const handleClose = () => {
    setIsLoginModal(false);
    navigate.toLoginPage();
  };

  const displayPage = () => {
    if (modalPage === SIGN_UP) {
      return <SignUpPage navigate={navigate} closeModal={closeModal} />;
    }
    if (modalPage === FORGOT_PASSWORD) {
      return <ForgotPasswordPage navigate={navigate} />;
    }

    return <LoginPage navigate={navigate} closeModal={closeModal} />;
  };

  // const pagesArr = [
  //   {
  //     pageName: SIGN_UP,
  //     componentToRender: <SignUpPage navigate={() => setModalPage(SIGN_UP)} />,
  //   },
  //   {
  //     pageName: FORGOT_PASSWORD,
  //     componentToRender: (
  //       <ForgotPasswordPage navigate={() => setModalPage(FORGOT_PASSWORD)} />
  //     ),
  //   },
  //   {
  //     pageName: LOGIN,
  //     componentToRender: <SignUpPage navigate={() => setModalPage(LOGIN)} />,
  //   },
  // ];

  // const { componentToRender } =
  //   pagesArr.find(({ pageName }) => pageName === modalPage) || {};

  return (
    <div>
      <Modal
        open={isLoginModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="login-modal-container"
      >
        <div className="login-modal">
          {displayPage()}
          <RiCloseFill
            className="login-modal-exit-icon"
            onClick={() => {
              handleClose();
            }}
          />
        </div>
      </Modal>
    </div>
  );
}

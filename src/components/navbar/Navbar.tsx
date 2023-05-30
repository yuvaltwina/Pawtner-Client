import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { VscHeartFilled } from 'react-icons/vsc';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import Drawer from '../drawer/Drawer';
import LoginModal from '../modals/authModal/AuthModal';
import { useGlobalContext } from '../../hooks/useContext';
import Cookies from 'js-cookie';
import ProfileList from '../profileList/ProfileList';
import { reloadAfterSecond } from '../../utils/data/functions';

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isProfileList, setIsProfileList] = useState(false);
  const {
    userDetails: { username, isLoggedIn },
    setUserDetails,
  } = useGlobalContext();

  const logout = () => {
    //need to clear also the jwt?
    Cookies.remove('login');
    setUserDetails({
      username: '',
      isLoggedIn: false,
      email: '',
      phoneNumber: '',
    });
    reloadAfterSecond();
  };
  const displayLogin = () => {
    if (isLoggedIn) {
      return (
        <span
          className="nav-user-and-list"
          onClick={() => {
            setIsProfileList(!isProfileList);
          }}
        >
          <span className="nav-user">
            <FaRegUser className="nav-user-icon"></FaRegUser>
            <p className="nav-user-name">{username}</p>
          </span>
          {isProfileList && (
            <ProfileList
              logout={logout}
              isProfileList={isProfileList}
              setIsProfileList={setIsProfileList}
            />
          )}
        </span>
      );
    }
    return (
      <button
        className="login"
        onClick={() => {
          setIsLoginModal(true);
        }}
      >
        Login
      </button>
    );
  };
  //לקחת את הלינקים מאובגקט
  return (
    <div className="navbar">
      <div className="nav-left-links">
        <Link className="nav-headline" to={'/'}>
          Pawtner
        </Link>
        <Link className="nav-link" to={'/breeds'}>
          About Breeds
        </Link>
        <Link className="nav-link" to={'/myDogs'}>
          My Dogs
        </Link>
      </div>
      <div className="nav-right-links">
        <Link to={'/favorites'}>
          <VscHeartFilled className="nav-favorite-icon" />
        </Link>
        <span
          onClick={() => {
            setIsDrawerOpen(true);
          }}
          className="nav-hamburger-icon"
        >
          <RxHamburgerMenu />
        </span>
        <div>
          <Drawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            setIsLoginModal={setIsLoginModal}
            logout={logout}
          />
        </div>
        <div className="nav-login-and-sign-up">
          {displayLogin()}
          <LoginModal
            isLoginModal={isLoginModal}
            setIsLoginModal={setIsLoginModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

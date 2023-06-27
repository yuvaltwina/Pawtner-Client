import React from 'react';
import { useState, useEffect } from 'react';
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
import { toast } from 'react-hot-toast';
import axios, { CancelTokenSource } from 'axios';
import { SERVER_URL } from '../../utils/data/data';
import { useQueryClient } from 'react-query';
//לקחת את הלינקים מאובגקט

function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isProfileList, setIsProfileList] = useState(false);
  const {
    userDetails: { username, isLoggedIn },
    setUserDetails,
  } = useGlobalContext();
  //האם לשנות את היוז אפקט?
  const openLoginModal = () => setIsLoginModal(true);
  const checkUserLoginCookie = async (source: CancelTokenSource) => {
    try {
      const loginResponse = await axios.get(SERVER_URL + '/user/loginCookie', {
        cancelToken: source.token,
        withCredentials: true,
      });
      const resMessage = loginResponse.data?.message;
      if (resMessage === 'User exist') {
        setUserDetails((prev) => {
          return {
            ...prev,
            isLoggedIn: true,
          };
        });
      }
    } catch (err) {}
  };
  useEffect(() => {
    //לשנות את זה  שזה לא יהיה קוקי אלא סתם משתנה שנשלח
    const verifiedCookie = Cookies.get('verified');
    if (verifiedCookie) {
      if (verifiedCookie === 'Successfully Verified') {
        toast.success(verifiedCookie);
      } else {
        verifiedCookie && toast.error(verifiedCookie);
      }
      Cookies.remove('verified');
    }
    let source = axios.CancelToken.source();
    const loginToken = Cookies.get('login');
    if (loginToken) {
      checkUserLoginCookie(source);
      return () => {
        source.cancel();
      };
    }
  }, [setUserDetails, Cookies]);

  const logout = () => {
    //need to clear also the jwt?
    Cookies.remove('login');
    setUserDetails({
      username: '',
      isLoggedIn: false,
      email: '',
      phoneNumber: '',
    });
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
          openLoginModal();
        }}
      >
        Login
      </button>
    );
  };
  //לקחת את הלינקים מאובגקט
  const displayOnlyLoggedInLinks = (child: any, route: string) => {
    if (isLoggedIn) {
      return (
        <Link className="nav-link" to={route}>
          {child}
        </Link>
      );
    } else {
      return (
        <a className="nav-link" onClick={openLoginModal}>
          {child}
        </a>
      );
    }
  };
  const displayAdminLink = () => {
    const isAdmin = username === 'Admin';
    if (isLoggedIn && isAdmin) {
      return (
        <Link className="nav-link" to={'/admin'}>
          {'Admin'}
        </Link>
      );
    }
  };
  return (
    <div className="navbar">
      <div className="nav-left-links">
        <Link className="nav-headline" to={'/'}>
          Pawtner
        </Link>
        <Link className="nav-link" to={'/breeds'}>
          About Breeds
        </Link>
        {displayOnlyLoggedInLinks('My Dogs', '/myDogs')}
        {displayAdminLink()}
      </div>
      <div className="nav-right-links">
        {displayOnlyLoggedInLinks(
          <VscHeartFilled className="nav-favorite-icon" />,
          '/favorites'
        )}
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

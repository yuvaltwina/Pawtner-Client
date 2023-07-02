import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaRegUser } from 'react-icons/fa';
import Drawer from '../drawer/Drawer';
import LoginModal from '../modals/authModal/AuthModal';
import { useGlobalContext } from '../../hooks/useContext';
import Cookies from 'js-cookie';
import ProfileList from '../profileList/ProfileList';
import { toast } from 'react-hot-toast';
import axios, { CancelTokenSource } from 'axios';
import axiosInstance from '../../utils/apiService/axiosInstance';
import { scrollToTheTop } from '../../utils/data/functions';

//לקחת את הלינקים מאובגקט

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
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
      const loginResponse = await axiosInstance.get('/user/loginCookie', {
        cancelToken: source.token,
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const isScrolled = scrollTop > 0;
      setIsScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          className="nav-login-and-sign-up"
          onClick={() => {
            setIsProfileList(!isProfileList);
          }}
        >
          <span className={`nav-user ${isScrolled ? 'scrolled-link' : ''}`}>
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
        className={`login nav-login-and-sign-up-button ${
          isScrolled ? 'scrolled-link' : ''
        }`}
        onClick={() => {
          openLoginModal();
        }}
      >
        Login
      </button>
    );
  };
  const displayOnlyLoggedInLinks = (child: any, route: string) => {
    if (isLoggedIn) {
      return (
        <Link
          className={`nav-link ${isScrolled ? 'scrolled-link' : ''}`}
          onClick={scrollToTheTop}
          to={route}
        >
          {child}
        </Link>
      );
    } else {
      return (
        <a
          className={`nav-link ${isScrolled ? 'scrolled-link' : ''}`}
          onClick={openLoginModal}
        >
          {child}
        </a>
      );
    }
  };
  const displayAdminLink = () => {
    const isAdmin = username === 'Admin';
    if (isLoggedIn && isAdmin) {
      return (
        <Link
          className={`nav-link ${isScrolled ? 'scrolled-link' : ''}`}
          to={'/admin'}
        >
          {'Admin'}
        </Link>
      );
    }
  };

  const displayHamburgerIcon = (
    <span
      onClick={() => {
        setIsDrawerOpen(true);
      }}
      className={`nav-hamburger-icon ${isScrolled ? 'scrolled-link' : ''}`}
    >
      <RxHamburgerMenu />
    </span>
  );

  const displayLink = {
    pawtner: (
      <Link
        className={`nav-headline ${isScrolled ? 'scrolled-nav-headline' : ''}`}
        onClick={scrollToTheTop}
        to={'/'}
      >
        Pawtner
      </Link>
    ),
    aboutBreeds: (
      <Link
        className={`nav-link ${isScrolled ? 'scrolled-link' : ''}`}
        onClick={scrollToTheTop}
        to={'/breeds'}
      >
        About Breeds
      </Link>
    ),
    myDogs: displayOnlyLoggedInLinks('My Dogs', '/myDogs'),
    admin: displayAdminLink(),
    favorites: displayOnlyLoggedInLinks('Favorites', '/favorites'),
    hamburger: displayHamburgerIcon,
    login: displayLogin(),
  };

  return (
    <>
      <LoginModal
        isLoginModal={isLoginModal}
        setIsLoginModal={setIsLoginModal}
      />
      <Drawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        setIsLoginModal={setIsLoginModal}
        logout={logout}
      />
      <div className={`navbar ${isScrolled ? 'scrolled-navbar' : ''}`}>
        <div className="nav-left-links">
          {displayLink.pawtner}
          {displayLink.aboutBreeds}
          {displayLink.myDogs}
          {displayLink.favorites}
          {displayLink.admin}
        </div>
        <div className="nav-right-links">
          {displayLink.hamburger}
          {displayLink.login}
        </div>
      </div>
    </>
  );
}

export default Navbar;

import * as React from 'react';
import './Drawer.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { TbDog } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { FiBookOpen } from 'react-icons/fi';
import { useGlobalContext } from '../../hooks/useContext';
import { scrollToTheTop } from '../../utils/data/functions';

const LOGIN_BUTTON_TEXT = 'Login';
interface TemporaryDrawer {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

export default function TemporaryDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  setIsLoginModal,
  logout,
}: TemporaryDrawer) {
  const {
    userDetails: { username, email, phoneNumber, isLoggedIn },
  } = useGlobalContext();
  const openLoginModal = () => setIsLoginModal(true);

  const DRAWER_LINKS = [
    {
      page: 'home',
      link: DRAWER_LINK_GENERATOR('', 'Home', <AiOutlineHome />, false),
    },
    {
      page: 'mydogs',
      link: DRAWER_LINK_GENERATOR('mydogs', 'My Dogs', <TbDog />, true),
    },
    {
      page: 'favorites',
      link: DRAWER_LINK_GENERATOR(
        'favorites',
        'Favorites',
        <AiOutlineHeart />,
        true
      ),
    },
    {
      page: 'breeds',
      link: DRAWER_LINK_GENERATOR(
        'breeds',
        'About Breeds',
        <FiBookOpen />,
        false
      ),
    },
  ];
  const DRAWER_ACTION_LINKS = [
    {
      actionFunction: logout,
      icon: <FiLogOut />,
      text: 'Sign Out',
    },
  ];
  function DRAWER_LINK_GENERATOR(
    link: String,
    name: string,
    icon: JSX.Element,
    isLoggedInlink: boolean
  ) {
    if (isLoggedInlink && !isLoggedIn) {
      return (
        <a className="drawer-link" onClick={openLoginModal}>
          <ListItemButton id="drawer-button">
            <span className="drawer-icon">{icon}</span>
            {name}
          </ListItemButton>
        </a>
      );
    }
    return (
      <Link className="drawer-link" to={`/${link}`}>
        <ListItemButton id="drawer-button">
          <span className="drawer-icon">{icon}</span>
          {name}
        </ListItemButton>
      </Link>
    );
  }

  const displayHeadLine = () => {
    if (isLoggedIn) {
      return (
        <div className="drawer-headline">
          <span className="drawer-headline-details">
            <h1 className="drawer-headline-username">{username}</h1>
            <h3 className="drawer-headline-email">{email}</h3>
            <h3 className="drawer-headline-email">{phoneNumber}</h3>
          </span>
        </div>
      );
    } else {
      return (
        <List>
          <ListItem
            className="drawer-login"
            onClick={() => {
              setIsDrawerOpen(false);
              openLoginModal();
            }}
            disablePadding
          >
            <ListItemButton id="drawer-button">
              <span className="drawer-icon">
                <BiLogInCircle />
              </span>
              {LOGIN_BUTTON_TEXT}
            </ListItemButton>
          </ListItem>
        </List>
      );
    }
  };

  const Displaylist = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {DRAWER_LINKS.map(({ link, page }) => {
          return (
            <ListItem
              onClick={() => {
                scrollToTheTop();
                setIsDrawerOpen(false);
              }}
              key={page}
              disablePadding
            >
              {link}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  const displayActionList = () => {
    const displayLinks = DRAWER_ACTION_LINKS.map(
      ({ icon, text, actionFunction }) => {
        return (
          <ListItem className="drawer-signout" key={text} disablePadding>
            <ListItemButton
              id="drawer-button"
              onClick={() => {
                setIsDrawerOpen(false);
                actionFunction();
              }}
            >
              <span className="drawer-icon">{icon}</span>
              {text}
            </ListItemButton>
          </ListItem>
        );
      }
    );
    return (
      <List>
        <Divider />
        {displayLinks}
      </List>
    );
  };

  const displayActionListIfLogged = isLoggedIn && displayActionList();

  return (
    <div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="drawer"
      >
        {displayHeadLine()}
        <Divider />
        {Displaylist()}
        {displayActionListIfLogged}
      </Drawer>
    </div>
  );
}

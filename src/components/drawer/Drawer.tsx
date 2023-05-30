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
import { TbDog } from 'react-icons/Tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiLogInCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/Fi';
import { FiBookOpen } from 'react-icons/Fi';
import { useGlobalContext } from '../../hooks/useContext';

const DRAWER_LINKS_GENERATOR = (
  link: String,
  name: string,
  icon: JSX.Element
) => {
  return (
    <Link className="drawer-link" to={`/${link}`}>
      <ListItemButton id="drawer-button">
        <span className="drawer-icon">{icon}</span>
        {name}
      </ListItemButton>
    </Link>
  );
};

const DRAWER_LINKS = [
  {
    page: 'home',
    link: DRAWER_LINKS_GENERATOR('', 'Home', <AiOutlineHome />),
  },
  {
    page: 'mydogs',
    link: DRAWER_LINKS_GENERATOR('mydogs', 'My Dogs', <TbDog />),
  },
  {
    page: 'favorites',
    link: DRAWER_LINKS_GENERATOR('favorites', 'Favorites', <AiOutlineHeart />),
  },
  {
    page: 'breeds',
    link: DRAWER_LINKS_GENERATOR('breeds', 'About Breeds', <FiBookOpen />),
  },
];
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

  const displayHeadLine = () => {
    if (isLoggedIn) {
      return (
        <div className="drawer-headline">
          <span className="drawer-headline-details">
            <h1 className="drawer-headline-username">{username}</h1>
            <h3 className="drawer-headline-email">{email}</h3>
            <h3 className="drawer-headline-email">{phoneNumber}</h3>
          </span>
          <Divider />
        </div>
      );
    } else {
      return (
        <div>
          <List>
            <ListItem className="drawer-login">
              <ListItemButton
                id="drawer-button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  setIsLoginModal(true);
                }}
              >
                <span className="drawer-icon">
                  <BiLogInCircle />
                </span>
                Login
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </div>
      );
    }
  };

  const Displaylist = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {DRAWER_LINKS.map((linkobject) => {
          const { link, page } = linkobject;
          return (
            <ListItem
              onClick={() => {
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

  const displaySignOut = (
    <List>
      <Divider />
      <ListItem className="drawer-signout">
        <ListItemButton
          id="drawer-button"
          onClick={() => {
            setIsDrawerOpen(false);
            logout();
          }}
        >
          <span className="drawer-icon">
            <FiLogOut />
          </span>
          Sign Out
        </ListItemButton>
      </ListItem>
    </List>
  );
  const displaySignOutIfLogged = isLoggedIn && displaySignOut;
  return (
    <div>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {displayHeadLine()}
        {Displaylist()}
        {displaySignOutIfLogged}
      </Drawer>
    </div>
  );
}

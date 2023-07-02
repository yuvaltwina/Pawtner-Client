import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import DraftsIcon from '@mui/icons-material/Drafts';
import { FiLogOut } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { MdSmartphone } from 'react-icons/md';
import { TfiPencilAlt } from 'react-icons/tfi';
import { useGlobalContext } from '../../hooks/useContext';
import Modal from '@mui/material/Modal';
import './profileList.css';

interface PropsType {
  logout: () => void;
  isProfileList: boolean;
  setIsProfileList: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BasicList({
  logout,
  isProfileList,
  setIsProfileList,
}: PropsType) {
  const {
    userDetails: { username, email, phoneNumber },
  } = useGlobalContext();

  const itemsList = [
    {
      icon: <FaRegUser className="profile-list-icon" />,
      category: username,
      id: 'username',
    },
    {
      icon: <DraftsIcon className="profile-list-icon" />,
      category: email,
      id: 'email',
    },
    {
      icon: <MdSmartphone className="profile-list-icon" />,
      category: phoneNumber,
      id: 'phoneNumber',
    },
  ];
  const actionItemsList = [
    // {
    //   text: 'Edit details',
    //   activeFunction: logout,
    //   icon: <TfiPencilAlt className="profile-list-icon" />,
    // },
    {
      text: 'Sign out',
      activeFunction: logout,
      icon: <FiLogOut className="profile-list-icon" />,
    },
  ];

  const displayListItems = () => {
    const displayItems = itemsList.map((singleItem) => {
      const { icon, category, id } = singleItem;
      return (
        <ListItem disablePadding key={id}>
          <ListItemButton>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={category} />
          </ListItemButton>
        </ListItem>
      );
    });
    return <List>{displayItems}</List>;
  };
  const displayActionListItems = actionItemsList.map(
    ({ text, icon, activeFunction }) => {
      return (
        <ListItem disablePadding key={text}>
          <ListItemButton onClick={activeFunction}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText className="profile-list-signout" primary={text} />
          </ListItemButton>
        </ListItem>
      );
    }
  );

  return (
    <Modal
      open={isProfileList}
      onClose={() => setIsProfileList(false)}
      className="profile-list-modal"
    >
      <div className="profile-list">
        <span className="triangle"></span>
        <nav className="profile-list-details">{displayListItems()}</nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>{displayActionListItems}</List>
        </nav>
      </div>
    </Modal>
  );
}

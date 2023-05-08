import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DraftsIcon from "@mui/icons-material/Drafts";
import { FiLogOut } from "react-icons/Fi";
import { FaRegUser } from "react-icons/fa";
import { useGlobalContext } from "../../hooks/useContext";
import Cookies from "js-cookie";
import Modal from "@mui/material/Modal";
import "./profileList.css";

export default function BasicList({
  logout,
  isProfileList,
  setIsProfileList,
}: {
  logout: () => void;
  isProfileList: boolean;
  setIsProfileList: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    setUserDetails,
    userDetails: { username, email },
  } = useGlobalContext();

  return (
    <Modal
      open={isProfileList}
      onClose={() => setIsProfileList(false)}
      className="profile-list-modal"
    >
      <div className="profile-list">
        <span className="triangle"></span>
        <nav className="profile-list-details">
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FaRegUser className="profile-list-icon" />
                </ListItemIcon>
                <ListItemText primary={username} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DraftsIcon className="profile-list-icon" />
                </ListItemIcon>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
        <Divider />
        <nav aria-label="secondary mailbox folders">
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => logout()}>
                <ListItemIcon>
                  <FiLogOut className="profile-list-icon" />
                </ListItemIcon>
                <ListItemText
                  className="profile-list-signout"
                  primary="Sign out"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </div>
    </Modal>
  );
}

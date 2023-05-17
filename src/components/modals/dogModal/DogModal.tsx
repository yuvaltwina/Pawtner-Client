import "./DogModal.css";
import * as React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { RiCloseFill } from "react-icons/ri";

import Modal from "@mui/material/Modal";
import Swipe from "../../swipe/Swipe";

type singleDogType = {
  NAME: string;
  BREED: string;
  GENDER: string;
  AGE: string;
  SIZE: string;
  LOCATION: string;
  IMAGE: string[];
  TEXT: string;
};

export const USER_CONTACTS_LIST = [
  {
    header: "User :",
    pargraph: "Yuval Twina",
    icon: <BsFillPersonFill />,
  },
  {
    header: "Address :",
    pargraph: "User Location",
    icon: <MdLocationOn />,
  },
  {
    header: "Phone :",
    pargraph: "052-2341-235",
    icon: <MdOutlinePhoneIphone />,
  },

  {
    header: "Email :",
    pargraph: "dsafsdf@gmail.com",
    icon: <AiOutlineMail />,
  },
];

export default function BasicModal({
  openDogModal,
  setOpenDogModal,
  singleDog,
}: {
  openDogModal: boolean;
  setOpenDogModal: React.Dispatch<React.SetStateAction<boolean>>;
  singleDog: singleDogType;
}) {
  //לשנות את המיקום לעיר לפי הזיפ קוד
  const { NAME, BREED, GENDER, AGE, SIZE, LOCATION, IMAGE, TEXT } = singleDog;
  const DOG_INFO_LIST = [
    {
      category: "Breed",
      value: BREED,
    },
    {
      category: "Gender",
      value: GENDER,
    },
    {
      category: "Age",
      value: AGE,
    },
    {
      category: "Size",
      value: SIZE,
    },
  ];

  const displayDogSpecificInfo = (value: string, category: string) => {
    return (
      <h3 key={category}>
        {value}
        <span className="dogmodal-dog-highlight">{category}</span>
      </h3>
    );
  };

  const footerUserDetails = () => {
    const contactInfoItems = USER_CONTACTS_LIST.map(
      ({ icon, header, pargraph }) => {
        return (
          <div key={header} className="dogmodal-dog-footer-info">
            <span className="dogmodal-dog-footer-icon">{icon}</span>
            <div>
              <h4>{header}</h4>
              <p>{pargraph}</p>
            </div>
          </div>
        );
      }
    );
    return contactInfoItems;
  };

  const displayDogInfo = DOG_INFO_LIST.map((specificInfo) => {
    const { category, value } = specificInfo;
    return displayDogSpecificInfo(`${category} : `, value);
  });

  return (
    <Modal
      open={openDogModal}
      onClose={() => setOpenDogModal(false)}
      className="dogmodal-container"
    >
      <div className="dogmodal">
        <Swipe IMAGE={IMAGE} />
        <RiCloseFill
          className="dog-modal-exit-icon"
          onClick={() => {
            setOpenDogModal(false);
          }}
        />
        <span className="dogmodal-headline">
          {displayDogSpecificInfo("About ", NAME)}
        </span>
        <section className="dogmodal-dog-info">{displayDogInfo}</section>
        <p className="dogmodal-dog-text">{TEXT}</p>
        <section className="dogmodal-dog-footer">{footerUserDetails()}</section>
      </div>
    </Modal>
  );
}

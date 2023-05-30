import './DogModal.css';
import * as React from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import Swipe from '../../swipe/Swipe';
import { SingleDogFullData } from '../../../utils/types/type';
import { phoneNumberFormating } from '../../../utils/data/functions';
import { Modal } from '@mui/material';

export default function BasicModal({
  openDogModal,
  setOpenDogModal,
  singleDog,
}: {
  openDogModal: boolean;
  setOpenDogModal: React.Dispatch<React.SetStateAction<boolean>>;
  singleDog: SingleDogFullData;
}) {
  const {
    about,
    age,
    breed,
    city,
    email,
    gender,
    imagesUrl,
    likedBy,
    name,
    phoneNumber,
    size,
    username,
  } = singleDog;
  const DOG_INFO_LIST = [
    {
      category: 'Breed',
      value: breed,
    },
    {
      category: 'Gender',
      value: gender,
    },
    {
      category: 'Age',
      value: age,
    },
    {
      category: 'Size',
      value: size,
    },
  ];
  const USER_CONTACTS_LIST = [
    {
      header: 'User :',
      pargraph: username,
      icon: <BsFillPersonFill />,
    },
    {
      header: 'City :',
      pargraph: city,
      icon: <MdLocationOn />,
    },
    {
      header: 'Phone :',
      pargraph: phoneNumberFormating(phoneNumber),
      icon: <MdOutlinePhoneIphone />,
    },

    {
      header: 'Email :',
      pargraph: email,
      icon: <AiOutlineMail />,
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
        <Swipe imagesUrl={imagesUrl} />
        <RiCloseFill
          className="dog-modal-exit-icon"
          onClick={() => {
            setOpenDogModal(false);
          }}
        />
        <span className="dogmodal-headline">
          {displayDogSpecificInfo('About ', name)}
        </span>
        <section className="dogmodal-dog-info">{displayDogInfo}</section>
        <p className="dogmodal-dog-text">{about}</p>
        <section className="dogmodal-dog-footer">{footerUserDetails()}</section>
      </div>
    </Modal>
  );
}

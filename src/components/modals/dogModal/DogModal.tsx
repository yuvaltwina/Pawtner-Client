import './DogModal.css';
import { useState } from 'react';
import { Modal } from '@mui/material';
import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdLocationOn, MdReportGmailerrorred } from 'react-icons/md';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { RiCloseFill } from 'react-icons/ri';
import { SingleDogFullData } from '../../../utils/types/type';
import Swipe from '../../swipe/Swipe';
import { phoneNumberFormating } from '../../../utils/data/functions';

const displayDogSpecificInfo = (value: string, category: string) => (
  <h3 key={category}>
    {value}
    <span className="dogmodal-dog-highlight">{category}</span>
  </h3>
);

interface PropTypes {
  openDogModal: boolean;
  setOpenDogModal: React.Dispatch<React.SetStateAction<boolean>>;
  singleDog: SingleDogFullData;
}

export default function BasicModal({
  openDogModal,
  setOpenDogModal,
  singleDog: {
    about,
    age,
    breed,
    city,
    email,
    gender,
    imagesUrl,
    name,
    phoneNumber,
    size,
    username,
  },
}: PropTypes) {
  const closeDogModal = () => setOpenDogModal(false);

  const dogInfoList = [
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
  const userContactsList = [
    {
      header: 'User:',
      pargraph: username,
      icon: <BsFillPersonFill />,
    },
    {
      header: 'Phone:',
      pargraph: phoneNumberFormating(phoneNumber),
      icon: <MdOutlinePhoneIphone />,
    },

    {
      header: 'City:',
      pargraph: city,
      icon: <MdLocationOn />,
    },
    {
      header: 'Email:',
      pargraph: email,
      icon: <AiOutlineMail />,
    },
  ];

  const contactInfoItems = userContactsList.map(
    ({ icon, header, pargraph }) => (
      <div key={header} className="dogmodal-dog-footer-info">
        <span className="dogmodal-dog-footer-icon">{icon}</span>
        <div className="dogmodal-dog-footer-details">
          <h4>{header}</h4>
          <p>{pargraph}</p>
        </div>
      </div>
    )
  );
  const displayDogInfo = dogInfoList.map(({ category, value }) =>
    displayDogSpecificInfo(`${category} : `, value)
  );
  BsFillPersonFill;

  return (
    <Modal
      open={openDogModal}
      onClose={closeDogModal}
      className="dogmodal-container"
    >
      <div className="dogmodal">
        <section className="dogmodal-swiper-container">
          <Swipe imagesUrl={imagesUrl} />
        </section>
        <RiCloseFill className="dog-modal-exit-icon" onClick={closeDogModal} />
        <span className="dogmodal-headline">
          {displayDogSpecificInfo('About ', name)}
        </span>
        <section className="dogmodal-dog-info">{displayDogInfo}</section>
        <p className="dogmodal-dog-text">{about}</p>
        <section className="dogmodal-dog-footer">{contactInfoItems}</section>
      </div>
    </Modal>
  );
}

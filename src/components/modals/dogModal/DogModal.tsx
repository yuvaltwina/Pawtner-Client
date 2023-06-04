import './DogModal.css';

import * as React from 'react';

import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdLocationOn } from 'react-icons/md';
import { MdOutlinePhoneIphone } from 'react-icons/md';
import { Modal } from '@mui/material';
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
    likedBy,
    name,
    phoneNumber,
    size,
    username,
  },
}: PropTypes) {
  const closeModal = () => setOpenDogModal(false);
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
      header: 'User :',
      pargraph: username,
      icon: <BsFillPersonFill />,
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
    {
      header: 'City :',
      pargraph: city,
      icon: <MdLocationOn />,
    },
  ];

  const contactInfoItems = userContactsList.map(
    ({ icon, header, pargraph }) => (
      <div key={header} className="dogmodal-dog-footer-info">
        <span className="dogmodal-dog-footer-icon">{icon}</span>
        <div>
          <h4>{header}</h4>
          <p>{pargraph}</p>
        </div>
      </div>
    )
  );

  const displayDogInfo = dogInfoList.map(({ category, value }) =>
    displayDogSpecificInfo(`${category} : `, value)
  );

  return (
    <Modal
      open={openDogModal}
      onClose={closeModal}
      className="dogmodal-container"
    >
      <div className="dogmodal">
        <Swipe imagesUrl={imagesUrl} />
        <RiCloseFill className="dog-modal-exit-icon" onClick={closeModal} />
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

import React, { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { HiTrash } from "react-icons/hi";
import { GrEdit } from "react-icons/gr";
import DogModal from "../dogModal/DogModal";
import DeleteModal from "../deleteModal/DeleteModal";
import "./Card.css";

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

function Card({
  singleDog: { NAME, BREED, GENDER, AGE, SIZE, LOCATION, IMAGE, TEXT },
  needFavorite = false,
  needEditAndTrash = false,
}: {
  singleDog: singleDogType;
  needFavorite?: boolean;
  needEditAndTrash?: boolean;
}) {
  const [openDogModal, setOpenDogModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isfavorite, setIsFavorite] = useState(false);

  const favoriteClickHandler = () => {
    setIsFavorite(!isfavorite);

    console.log(
      `${isfavorite ? "deleted from favorites" : "added to favorites"}`
    );
  };

  const displayFavoriteIcon =
    needFavorite &&
    (isfavorite ? (
      <span
        className="card-favorite-icon-clicked"
        onClick={() => {
          favoriteClickHandler();
        }}
      >
        <MdFavorite className="card-favorite-icon-clicked-hey" />
      </span>
    ) : (
      <span
        className="card-favorite-icon"
        onClick={() => {
          favoriteClickHandler();
        }}
      >
        <MdOutlineFavoriteBorder />
      </span>
    ));

  const displayEditAndTrash = needEditAndTrash && (
    <div>
      <span className="card-edit-icon" onClick={() => {}}>
        <GrEdit className="card-favorite-icon-clicked-hey" />
      </span>
      <span
        className="card-trash-icon"
        onClick={() => {
          setOpenDeleteModal(true);
        }}
      >
        <HiTrash className="card-favorite-icon-clicked-hey" />
      </span>
    </div>
  );

  return (
    <div className="card-container">
      <div
        className="card"
        onClick={() => {
          setOpenDogModal(true);
        }}
      >
        <div className="card-image"></div>
        <div className="card-name">{NAME}</div>
      </div>
      <DogModal
        openDogModal={openDogModal}
        setOpenDogModal={setOpenDogModal}
        singleDog={{ NAME, BREED, GENDER, AGE, SIZE, LOCATION, IMAGE, TEXT }}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        setOpenDeleteModal={setOpenDeleteModal}
      />
      {displayFavoriteIcon}
      {displayEditAndTrash}
    </div>
  );
}

export default Card;

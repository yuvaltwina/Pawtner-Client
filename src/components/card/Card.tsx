import { useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import DogModal from '../modals/dogModal/DogModal';
import DeleteModal from '../modals/deleteModal/DeleteModal';
import './Card.css';
import { EditDogFormData, SingleDogFullData } from '../../utils/types/type';
import { TfiPencilAlt } from 'react-icons/tfi';
import AddModal from '../../components/modals/addModal/AddModal';
import useDogBreeds from '../../hooks/useGetBreeds';

function Card({
  singleDog,
  needEditAndTrash = false,
  dogsArray,
  setDogsArray,
  dogBreedsNamesArray,
}: {
  singleDog: SingleDogFullData;
  needEditAndTrash?: boolean;
  dogsArray?: SingleDogFullData[];
  setDogsArray?: React.Dispatch<React.SetStateAction<SingleDogFullData[]>>;
  dogBreedsNamesArray?: string[];
}) {
  const [openDogModal, setOpenDogModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  // const [isfavorite, setIsFavorite] = useState(false);
  const { name, breed, gender, age, size, about, city, imagesUrl, _id } =
    singleDog;

  const editDogData: EditDogFormData = {
    name,
    breed,
    gender,
    age,
    size,
    about,
    city,
    images: [],
  };

  const displayEditAndTrash = needEditAndTrash && (
    <div>
      <span
        className="card-edit-icon"
        onClick={() => {
          setOpenEditModal(true);
        }}
      >
        <TfiPencilAlt />
      </span>
      <span
        className="card-trash-icon"
        onClick={() => {
          setOpenDeleteModal(true);
        }}
      >
        <HiTrash />
      </span>
    </div>
  );
  return (
    <>
      {openDogModal && (
        <DogModal
          openDogModal={openDogModal}
          setOpenDogModal={setOpenDogModal}
          singleDog={singleDog}
        />
      )}
      {/* לשנות את הקונדישן */}
      {dogsArray && setDogsArray && openDeleteModal && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          dogId={_id}
          setMyDogs={setDogsArray}
          myDogs={dogsArray}
        />
      )}
      {openEditModal && dogBreedsNamesArray && (
        <AddModal
          openAddModal={openEditModal}
          setOpenAddModal={setOpenEditModal}
          editDogData={editDogData}
          dogId={_id}
          dogBreedsNamesArray={dogBreedsNamesArray}
        />
      )}
      <div className="card-container">
        <div
          className="card"
          onClick={() => {
            setOpenDogModal(true);
          }}
        >
          <div
            className="card-image"
            style={{ backgroundImage: `url(${imagesUrl[0]})` }}
          ></div>
          <div className="card-name">{name}</div>
        </div>
        {displayEditAndTrash}
      </div>
    </>
  );
}

export default Card;

import './deleteModal.css';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { SERVER_URL } from '../../../utils/data/data';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { SingleDogFullData } from '../../../utils/types/type';
import { MdOutlineCancel } from 'react-icons/md';

const DELETE_TITLE_TEXT = 'Are you sure?';
const DELETE_SUBTITLE_TEXT =
  'Do you really want to delete this post? this process cannot be undone';
interface PropsType {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  dogId: string;
  myDogs: SingleDogFullData[];
  setMyDogs: React.Dispatch<React.SetStateAction<SingleDogFullData[]>>;
}

export default function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  dogId,
  myDogs,
  setMyDogs,
}: PropsType) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const deleteDog = async () => {
    setIsSubmiting(true);
    try {
      const serverResponse = await axios.post(
        SERVER_URL + '/dog/deleteDog',
        { id: dogId },
        {
          withCredentials: true,
        }
      );
      if (serverResponse?.data?.message === 'deleted successfully') {
        toast.success('Dog post deleted successfully!');
        const afterDelete = myDogs.filter((dog) => {
          return dog._id !== dogId;
        });
        setMyDogs(afterDelete);
        setOpenDeleteModal(false);
      }
    } catch (err: any) {
      toast.error('Something went wrong please try again later');
    }
    setIsSubmiting(false);
  };
  return (
    <Modal
      open={openDeleteModal}
      onClose={() => setOpenDeleteModal(false)}
      className="delete-modal-container"
    >
      <div className="delete-modal">
        <MdOutlineCancel className="delete-modal-icon" />
        <h1 className="delete-modal-headline">{DELETE_TITLE_TEXT}</h1>
        <p className="delete-modal-subtitle">{DELETE_SUBTITLE_TEXT} </p>
        <span className="delete-modal-buttons-container">
          <button
            className="delete-modal-cancel"
            onClick={() => {
              setOpenDeleteModal(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmiting}
            className="delete-modal-delete"
            onClick={() => {
              deleteDog();
            }}
          >
            Delete
          </button>
        </span>
      </div>
    </Modal>
  );
}

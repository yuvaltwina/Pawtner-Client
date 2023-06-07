import './deleteModal.css';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { SERVER_URL } from '../../../utils/data/data';
import axios from 'axios';
import { useGlobalContext } from '../../../hooks/useContext';
import { toast } from 'react-hot-toast';
import { SingleDogFullData } from '../../../utils/types/type';
import { Filter } from '@material-ui/icons';

const DELETE_TITLE_TEXT = 'Are you sure you want to delete this post ?';
const DELETE_SUBTITLE_TEXT =
  'This will delete this post permanently. you cannot undo this action';

export default function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  dogId,
  myDogs,
  setMyDogs,
}: {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  dogId: string;
  myDogs: SingleDogFullData[];
  setMyDogs: React.Dispatch<React.SetStateAction<SingleDogFullData[]>>;
}) {
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
        <h1 className="delete-modal-headline">{DELETE_TITLE_TEXT}</h1>
        <p className="delete-modal-subtitle">{DELETE_SUBTITLE_TEXT} </p>
        <span className="delete-modal-buttons-container">
          <button
            className="delete-modal-cancel"
            onClick={() => {
              setOpenDeleteModal(false);
            }}
          >
            cancel
          </button>
          <button
            type="submit"
            disabled={isSubmiting}
            className="delete-modal-delete"
            onClick={() => {
              deleteDog();
            }}
          >
            delete
          </button>
        </span>
      </div>
    </Modal>
  );
}

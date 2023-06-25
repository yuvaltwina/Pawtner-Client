import './deleteModal.css';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { toast } from 'react-hot-toast';
import { MdOutlineCancel } from 'react-icons/md';
import { useQueryClient } from 'react-query';
import useDeleteMutation from '../../../hooks/queryCustomHooks/delete/useDeleteMutation';

const DELETE_TITLE_TEXT = 'Are you sure?';
const DELETE_SUBTITLE_TEXT =
  'Do you really want to delete this post? this process cannot be undone';

interface PropsType {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  dogId: string;
}

export default function DeleteModal({
  openDeleteModal,
  setOpenDeleteModal,
  dogId,
}: PropsType) {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const queryClient = useQueryClient();

  const closeModal = () => setOpenDeleteModal(false);

  const onErrorDeleteDog = (error: any, loadingDogToast: string) => {
    const serverErrorResponse = error?.response?.data?.message;
    if (serverErrorResponse === 'unauthorized') {
      toast.error('Unauthorized', { id: loadingDogToast });
    } else {
      toast.error('Something went wrong', { id: loadingDogToast });
    }
  };

  const onSuccsessDeleteDog = (loadingDogToast: string) => {
    toast.success(`Dog post deleted successfully!`, { id: loadingDogToast });
    queryClient.invalidateQueries(['myDogs'], { exact: true });
    queryClient.invalidateQueries(['allDogs'], { exact: true });
    closeModal();
  };

  const { deleteDogMutation } = useDeleteMutation(
    onSuccsessDeleteDog,
    onErrorDeleteDog
  );

  const clickHandler = async () => {
    setIsSubmiting(true);
    deleteDogMutation.mutate(dogId);
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
            onClick={clickHandler}
          >
            Delete
          </button>
        </span>
      </div>
    </Modal>
  );
}

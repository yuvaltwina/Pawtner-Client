import "./deleteModal.css";
import * as React from "react";
import Modal from "@mui/material/Modal";

const DELETE_TITLE_TEXT = "Are you sure you want to delete this post?";
const DELETE_SUBTITLE_TEXT =
  "This will delete this post permanently. you cannot undo this action.";

export default function BasicModal({
  openDeleteModal,
  setOpenDeleteModal,
}: {
  openDeleteModal: boolean;
  setOpenDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
          <button className="delete-modal-delete">delete</button>
        </span>
      </div>
    </Modal>
  );
}

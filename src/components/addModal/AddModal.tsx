import "./addModal.css";
import Modal from "@mui/material/Modal";
import SelectButtonList from "../selectButtons/selectButtonList/SelectButtonList";

export default function BasicModal({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      open={openAddModal}
      onClose={() => setOpenAddModal(false)}
      className="addmodal-container"
    >
      <div className="addmodal">
        <h1> Create new adoption post</h1>
        <SelectButtonList
          divClass="primary-preferences-buttons-container"
          spanClass="primary-preferences-button"
        />
      </div>
    </Modal>
  );
}

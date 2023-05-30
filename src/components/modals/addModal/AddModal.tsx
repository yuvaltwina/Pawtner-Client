import './addModal.css';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { ADD_DOG_SELECT_BUTTONS, SERVER_URL } from '../../../utils/data/data';
import SelectOneButton from '../../selectButtons/selectOneButton/selectOneButton';
import TextField from '@mui/material/TextField';
import DropZone from '../../dropZone/DropZone';
import { RiCloseFill } from 'react-icons/ri';
import { DogFormData, EditDogFormData } from '../../../utils/types/type';
import { cityOptions } from '../../../utils/data/cities';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Modal } from '@mui/material';
import { reloadAfterSecond } from '../../../utils/data/functions';

const ABOUT_WIDTH = 'clamp(17rem,80%,44rem)';
const INPUTS_WIDTH = 'clamp(17rem,45%,21rem)';
const NAME_REGEX = /^(?=.*[a-zA-Z].*[a-zA-Z])[a-zA-Z\s]{2,12}$/; //atleast letters 2-12 can contain whitespace
const ABOUT_REGEX = /^.{15,200}$/; // 15-200 chars

const DATA_LIST: DogFormData = {
  breed: '',
  gender: '',
  age: '',
  size: '',
  name: '',
  about: '',
  city: '',
  images: [],
};
const DATA_ERROR_LIST = {
  breed: '',
  gender: '',
  age: '',
  size: '',
  name: '',
  about: '',
  city: '',
  images: '',
};
//לעשות מודל רספונסיבי
//לשנות שהשורות לא יגדל כשאני בוחר טקסט
//לשנות שזה לא יעשה רענן אלה יעשה פטץ שוב
export default function BasicModal({
  openAddModal,
  setOpenAddModal,
  editDogData,
  dogId = '',
}: {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  editDogData?: EditDogFormData;
  dogId?: string;
}) {
  const isEditing = !!editDogData;
  const [data, setData] = useState(!!isEditing ? editDogData : DATA_LIST);
  const [errors, setErrors] = useState(DATA_ERROR_LIST);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { name, about, images } = data;

  const onChange = ({
    target: { value, id },
  }: {
    target: { value: string; id: string };
  }) => {
    setData((prevState) => ({ ...prevState, [id]: value }));
  };

  const displaySelectButtons = () => {
    const selectButtons = ADD_DOG_SELECT_BUTTONS.map((selectbutton) => {
      const { category, valuesArray } = selectbutton;
      return (
        <span className="addmodal-preferences-button" key={category}>
          <SelectOneButton
            category={category}
            valuesArray={valuesArray}
            setData={setData}
            initialValue={data[category] as string}
          />
          <p></p>
        </span>
      );
    });
    return selectButtons;
  };
  const displayDataFields = () => {
    const selectButtons = displaySelectButtons();
    return (
      <span className="addmodal-select-buttons-container ">
        <TextField
          id="name"
          label="DOG'S NAME"
          className="addmodal-input-field"
          error={Boolean(errors.name)}
          helperText={Boolean(errors.name) ? errors.name : ''}
          value={name}
          onChange={onChange}
          autoComplete="on"
          required
          sx={{ width: INPUTS_WIDTH }}
        />

        <Autocomplete
          disablePortal
          options={cityOptions}
          value={data.city || null}
          sx={{ width: INPUTS_WIDTH }}
          onChange={(event, value) => {
            value && onChange({ target: { id: 'city', value } });
          }}
          renderInput={(params) => (
            <>
              {/* <VirtualizedList /> */}
              <TextField {...params} label="CITY" required />
            </>
          )}
        />
        {selectButtons}
      </span>
    );
  };
  const closeModal = () => {
    setOpenAddModal(false);
    setErrors(DATA_ERROR_LIST);
    setData(DATA_LIST);
  };
  const errorsCheck = () => {
    let errorMessage = '';
    let errCategory = '';
    if (images.length <= 0 && !isEditing) {
      errorMessage = 'Atleast one image is required';
      errCategory = 'images';
    }
    if (!about.match(ABOUT_REGEX)) {
      errorMessage = 'Only letters and digits between 15-200 characters';
      errCategory = 'about';
    }
    if (!name.match(NAME_REGEX)) {
      errorMessage = 'Only letters between 2-12 characters';
      errCategory = 'name';
    }
    setErrors({
      ...DATA_ERROR_LIST,
      [errCategory]: errorMessage,
    });
    const isError = Boolean(errorMessage);
    return isError;
  };
  const handleServerResponse = (serverRespone: string) => {
    if (serverRespone === 'dog created successfully') {
      toast.success('Dog post created successfully!', { duration: 4000 });
      reloadAfterSecond();
      closeModal();
      return;
    }
    if (serverRespone === 'dog edited successfully') {
      closeModal();
      toast.success('Dog post edited successfully!');
      reloadAfterSecond();
      return;
    }
    if (serverRespone === 'unauthorized') {
      toast.error('Unauthorized please login first');
      return;
    }
    toast.error('Something went wrong please try again later');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);
    const isError = errorsCheck();
    if (isError) {
      setIsSubmiting(false);
      return;
    }
    try {
      const serverResponse = await axios.post(
        SERVER_URL + `/dog/${isEditing ? 'editDog' : 'addDog'}`,
        {
          data,
          _id: isEditing ? dogId : '',
        },
        {
          withCredentials: true,
        }
      );
      const serverResponseMessage = serverResponse.data?.message || '';
      handleServerResponse(serverResponseMessage);
    } catch (err: any) {
      const serverErrorMessage = err.response?.data?.message || '';
      handleServerResponse(serverErrorMessage);
    }
    setErrors(DATA_ERROR_LIST);
    setIsSubmiting(false);
  };
  return (
    <Modal
      open={openAddModal}
      onClose={() => closeModal()}
      className="addmodal-container"
    >
      <div className="addmodal">
        <h1 className="addmodal-headline"> Dog Adoption Details</h1>
        <form className="addmodal-form" onSubmit={handleSubmit}>
          {displayDataFields()}
          <TextField
            id="about"
            label="ABOUT"
            className="addmodal-text-field"
            sx={{ width: ABOUT_WIDTH }}
            error={Boolean(errors.about)}
            helperText={Boolean(errors.about) ? errors.about : ''}
            value={about}
            onChange={onChange}
            multiline
            rows={4}
            autoComplete="on"
            required
          />
          {!isEditing && (
            <>
              <DropZone
                data={data as DogFormData}
                setData={
                  setData as React.Dispatch<React.SetStateAction<DogFormData>>
                }
                isError={Boolean(errors.images)}
              />
              <p className="addmodal-dropzone-error">{errors.images}</p>{' '}
            </>
          )}

          <RiCloseFill
            className="addmodal-exit-icon"
            onClick={() => {
              closeModal();
            }}
          />
          <button
            type="submit"
            className="addmodal-submit"
            disabled={isSubmiting}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </Modal>
  );
}

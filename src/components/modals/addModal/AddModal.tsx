import './addModal.css';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import { ADD_DOG_SELECT_BUTTONS, SERVER_URL } from '../../../utils/data/data';
import SelectOneButton from '../../selectButtons/selectOneButton/selectOneButton';
import TextField from '@mui/material/TextField';
import DropZone from '../../dropZone/DropZone';
import { RiCloseFill } from 'react-icons/ri';
import { DogFormData } from '../../../utils/types/type';
import { cities } from '../../../utils/data/cities';
import { capitalizeOnlyFirstChars } from '../../../utils/data/functions';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ABOUT_WIDTH = 'clamp(17rem,80%,100rem)';
const INPUTS_WIDTH = 'clamp(17rem,45%,30rem)';
const NAME_REGEX = /^[a-zA-Z]{2,12}$/; //letters 2-12
const ABOUT_REGEX = /^.{15,200}$/; // 15-200 chars

const DATA_LIST = {
  breed: '',
  gender: '',
  age: '',
  size: '',
  name: '',
  about: '',
  city: '',
  //there is also images
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

export default function BasicModal({
  openAddModal,
  setOpenAddModal,
}: {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [data, setData] = useState(DATA_LIST);
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [errors, setErrors] = useState(DATA_ERROR_LIST);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { name, about } = data;
  // לעשות סינון של כלבים לפי עיר
  //לעשות מודל רספונסיבי
  const onChange = ({
    target: { value, id },
  }: {
    target: { value: string; id: string };
  }) => {
    setData((prevState) => ({ ...prevState, [id]: value }));
  };

  const citiesWithDuplicates: string[] = cities.map((city) =>
    capitalizeOnlyFirstChars(city.english_name).trim()
  );
  const cityOptions = [...new Set(citiesWithDuplicates)];

  const displaySelectButtons = () => {
    const selectButtons = ADD_DOG_SELECT_BUTTONS.map(
      (selectbutton: { category: string; valuesArray: string[] }) => {
        const {
          category,
          valuesArray,
        }: { category: string; valuesArray: string[] } = selectbutton;
        return (
          <span className="addmodal-preferences-button" key={category}>
            <SelectOneButton
              category={category}
              valuesArray={valuesArray}
              setData={setData}
            />
            <p></p>
          </span>
        );
      }
    );
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
          sx={{ width: INPUTS_WIDTH }}
          onChange={(event, value) => {
            value && onChange({ target: { id: 'city', value } });
          }}
          renderInput={(params) => (
            <TextField {...params} label="CITY" required />
          )}
        />
        {selectButtons}
      </span>
    );
  };

  const errorsCheck = () => {
    let errorMessage = '';
    let errCategory = '';
    if (!(images.length > 0)) {
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
  //לשלוח את המידע לבאקאנד שישמור את הכלב
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);
    const isError = errorsCheck();
    if (isError) {
      setIsSubmiting(false);
      return;
    }
    try {
      console.log(images);
      const serverResponse = await axios.post(
        SERVER_URL + '/dog/addDog',
        // data,
        { images }
      );
      const isServerVerified =
        serverResponse.data?.message === 'dog created successfully';
      if (isServerVerified) {
        toast.success('Dog post created successfully!');
        setData(DATA_LIST);
        setImages([]);
        setOpenAddModal(false);
      } else {
        console.log(1);
        toast.error('Something went wrong please try again later');
      }
    } catch (err: any) {
      const serverError = err.response?.data?.message || '';
      console.log(serverError);
      toast.error('Something went wrong please try again later');
    }
    setErrors(DATA_ERROR_LIST);
    setIsSubmiting(false);
  };

  return (
    <Modal
      open={openAddModal}
      onClose={() => setOpenAddModal(false)}
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
          <DropZone
            images={images}
            setImages={setImages}
            isError={Boolean(errors.images)}
          />
          <p className="addmodal-dropzone-error">{errors.images}</p>
          <RiCloseFill
            className="addmodal-exit-icon"
            onClick={() => {
              setOpenAddModal(false);
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

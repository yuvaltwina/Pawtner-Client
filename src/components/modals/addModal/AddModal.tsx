import './addModal.css';

import { DogFormData, EditDogFormData } from '../../../utils/types/type';

import { ADD_DOG_SELECT_BUTTONS } from '../../../utils/data/data';
import Autocomplete from '@mui/material/Autocomplete';
import DropZone from '../../dropZone/DropZone';
import { Modal } from '@mui/material';
import { RiCloseFill } from 'react-icons/ri';
import SelectOneButton from '../../selectButtons/selectOneButton/selectOneButton';
import TextField from '@mui/material/TextField';
import { cityOptions } from '../../../utils/data/cities';
import { toast } from 'react-hot-toast';
import usePostMutation from '../../../hooks/queryCustomHooks/post/usePostMutation';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import useUpdateMutation from '../../../hooks/queryCustomHooks/update/useUpdateMutation';

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
interface PropsType {
  openAddModal: boolean;
  setOpenAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  editDogData?: EditDogFormData;
  dogId?: string;
  dogBreedsNamesArray: string[];
}
export default function BasicModal({
  openAddModal,
  setOpenAddModal,
  editDogData,
  dogId = '',
  dogBreedsNamesArray,
}: PropsType) {
  const isEditing = !!editDogData;
  const [data, setData] = useState(!!isEditing ? editDogData : DATA_LIST);
  const [errors, setErrors] = useState(DATA_ERROR_LIST);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const { name, about, images } = data;
  const selectButtonsData: {
    category: keyof DogFormData;
    valuesArray: string[];
  }[] = [
    ...ADD_DOG_SELECT_BUTTONS,
    {
      category: 'breed',
      valuesArray: dogBreedsNamesArray,
    },
  ];
  const queryClient = useQueryClient();
  const onSuccsessCreateOrEditDog = (loadingDogToast: string) => {
    toast.success(
      `Dog post ${isEditing ? 'edited' : 'created'} successfully!`,
      { id: loadingDogToast }
    );
    queryClient.invalidateQueries(['myDogs'], { exact: true });
    closeModal();
  };
  const onErrorCreateOrEditDog = (error: any, loadingDogToast: string) => {
    const serverErrorResponse = error?.response?.data?.message;
    if (serverErrorResponse === 'unauthorized') {
      toast.error('Unauthorized', { id: loadingDogToast });
    } else {
      toast.error('Something went wrong', { id: loadingDogToast });
    }
  };

  const { createDogMutation } = usePostMutation(
    onSuccsessCreateOrEditDog,
    onErrorCreateOrEditDog
  );
  const { updateDogMutation } = useUpdateMutation(
    onSuccsessCreateOrEditDog,
    onErrorCreateOrEditDog
  );

  const onChange = ({
    target: { value, id },
  }: {
    target: { value: string; id: string };
  }) => {
    setData((prevState) => ({ ...prevState, [id]: value }));
  };

  const displaySelectButtons = () => {
    const selectButtons = selectButtonsData.map((selectbutton) => {
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
            <TextField {...params} label="CITY" required />
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmiting(true);
    const isError = errorsCheck();
    if (isError) {
      setIsSubmiting(false);
      return;
    }
    // לתקן את הas
    if (isEditing) {
      updateDogMutation.mutate({ data, dogId } as {
        data: EditDogFormData;
        dogId: string;
      });
    } else {
      createDogMutation.mutate(data);
    }
    setErrors(DATA_ERROR_LIST);
    setIsSubmiting(false);
  };
  const displayDropZoneOrSpace = isEditing ? (
    ''
  ) : (
    <>
      <DropZone
        data={data as DogFormData}
        setData={setData as React.Dispatch<React.SetStateAction<DogFormData>>}
        isError={Boolean(errors.images)}
      />
      <p className="addmodal-dropzone-error">{errors.images}</p>{' '}
    </>
  );

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
          {displayDropZoneOrSpace}
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

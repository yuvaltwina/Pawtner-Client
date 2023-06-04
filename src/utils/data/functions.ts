import axios, { CancelTokenSource } from 'axios';
import { SERVER_URL } from './data';
import { SingleDogFullData } from '../types/type';
import { toast } from 'react-hot-toast';
import { useGlobalContext } from '../../hooks/useContext';

export const capitalizeOnlyFirstChars = (str: string) => {
  const words = str.toLowerCase().split(' ');
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
  return capitalizedWords.join(' ');
};
export const getBase64 = (
  file: File,
  cb: (result: string, isError: boolean, file: File) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result as string, false, file);
  };
  reader.onerror = function (error) {
    cb(error.toString(), true, file);
  };
};
export const phoneNumberFormating = (str: string) => {
  const phoneFormatString =
    str.slice(0, 3) + '-' + str.slice(3, 6) + '-' + str.slice(6);
  return phoneFormatString;
};
export async function fetchDogsArray(
  serverLastRoute: string,
  source?: CancelTokenSource
) {
  let arrayOfDogs = [];
  try {
    const serverResponse = await axios.get(
      SERVER_URL + `/dog/${serverLastRoute}`,
      {
        withCredentials: true,
        cancelToken: source?.token,
      }
    );
    const resMessage = serverResponse.data?.message;
    if (resMessage === 'sent successfully') {
      arrayOfDogs = serverResponse.data.data.dogs;
    } else {
      toast.error('Something went wrong');
    }
  } catch (err: any) {
    if (err?.response?.data?.message === 'unauthorized') {
      toast.error('Unauthorized');
    }
  }
  return arrayOfDogs;
}
export const reloadAfterSecond = () => {
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};
export const dogFavoriteAction = async (dogId: string, action: string) => {
  try {
    const serverResponse = await axios.post(
      SERVER_URL + `/dog/${action}FavoriteDog`,
      {
        dogId,
      },
      {
        withCredentials: true,
      }
    );
    const resMessage = serverResponse.data?.message;
    if (
      !(
        resMessage === 'favorite added successfully' ||
        'favorite deleted successfully'
      )
    ) {
      toast.error('Something went wrong please try again later');
    }
  } catch (err) {
    {
      toast.error('Something went wrong');
    }
  }
};
export const getFavoriteDogs = async () => {
  const {
    userDetails: { username },
  } = useGlobalContext();

  const serverResponse = await axios.get(
    SERVER_URL + `/dog/getFavoriteDogs?username=${username}`,
    {
      withCredentials: true,
    }
  );
  const resMessage = serverResponse.data?.message;
  if (resMessage === 'favorite added successfully') {
    const favoriteDogsArray = serverResponse.data?.favoriteDogs;
    return favoriteDogsArray;
  } else {
    return [];
  }
};

export const getDogById = (targetId: string, allDogs: SingleDogFullData[]) => {
  const dog = allDogs.filter((dog) => dog._id === targetId);
  return dog[0];
};
// export const getBreedList = () => {
//   const dog = allDogs.filter((dog) => dog._id === targetId);
//   return dog[0];
// };

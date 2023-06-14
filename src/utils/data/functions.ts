import axios, { CancelTokenSource } from 'axios';

import { SERVER_URL } from './data';
import { DogFormData, EditDogFormData, SingleDogFullData } from '../types/type';
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
//  ולהעביר לריאקט קוורי
// export const getFavoriteDogs = async () => {
//   const {
//     userDetails: { username },
//   } = useGlobalContext();
//   try {
//     const serverResponse = await axios.get(
//       SERVER_URL + `/dog/getFavoriteDogs?username=${username}`,
//       {
//         withCredentials: true,
//       }
//     );
//     const resMessage = serverResponse.data?.message;
//     if (resMessage === 'favorite added successfully') {
//       const favoriteDogsArray = serverResponse.data?.favoriteDogs;
//       return favoriteDogsArray;
//     } else {
//       return [];
//     }
//   } catch (err) {
//     return [];
//   }
// };

export const getDogById = (targetId: string, allDogs: SingleDogFullData[]) => {
  const dog = allDogs.filter((dog) => dog._id === targetId);
  return dog[0];
};
//האם צריך לעשות טרי וקאצ בריאקט קוורי
export async function fetchAllDogs() {
  const serverResponse = await axios.get(SERVER_URL + `/dog/getAllDogs`, {
    withCredentials: true,
  });
  return serverResponse;
}
export async function fetchMyDogs() {
  const serverResponse = await axios.get(SERVER_URL + `/dog/getMyDogs`, {
    withCredentials: true,
  });
  return serverResponse;
}
export async function fetchAllBreeds() {
  const serverResponse = await axios.get('https://api.thedogapi.com/v1/breeds');
  return serverResponse;
}

export async function addDog(data: DogFormData) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/addDog`,
    { data },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}
export async function editDog({
  data,
  dogId,
}: {
  data: EditDogFormData;
  dogId: string;
}) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/editDog`,
    { data, _id: dogId },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}
export async function deleteDog(dogId: string) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/deleteDog`,
    { id: dogId },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}
export async function fetchFavoriteDogs() {
  const serverResponse = await axios.get(SERVER_URL + `/dog/getFavoriteDogs`, {
    withCredentials: true,
  });
  return serverResponse;
}
export async function addFavorteDog(dogId: string) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/deleteDog`,
    { id: dogId },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}
export async function deleteFavorteDog(dogId: string) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/deleteDog`,
    { id: dogId },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}

import axios from 'axios';
import { SERVER_URL } from '../data/data';
import { DogFormData, EditDogFormData } from '../types/type';
//צריך טרי וקאץ אם אני משתמש בריאקט קוורי ???
//get

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

export async function fetchFavoriteDogs() {
  const serverResponse = await axios.get(SERVER_URL + `/dog/getFavoriteDogs`, {
    withCredentials: true,
  });
  return serverResponse;
}

//update
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

export async function changePassword({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) {
  const serverResponse = await axios.post(SERVER_URL + '/user/changePassword', {
    newPassword,
    token,
  });
  return serverResponse;
}

//post
export async function checkLoginDetails({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const serverResponse = await axios.post(SERVER_URL + '/user/login', {
    email,
    password,
  });
  return serverResponse;
}

export async function sendChangePasswordEmail(email: string) {
  const serverResponse = await axios.post(SERVER_URL + '/user/forgotPassword', {
    email,
  });
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

export async function addFavorteDog(dogId: string) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/addFavorteDog`,
    { dogId },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}

//delete

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

export async function deleteFavoriteDog(dogId: string) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/deleteFavoriteDog`,
    { dogId },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}

//

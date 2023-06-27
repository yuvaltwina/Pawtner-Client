import axios from 'axios';
import { DogFormData, EditDogFormData } from '../types/type';
import axiosInstance from './axiosInstance';
//צריך טרי וקאץ אם אני משתמש בריאקט קוורי ???
//get

interface sendEmailPropsType {
  email: string;
  password: string;
  username: string;
  phoneNumber: string;
}

export async function checkLoginCookie() {
  const serverResponse = await axiosInstance.get('/user/loginCookie');
  return serverResponse;
}

export async function fetchAllDogs() {
  const serverResponse = await axiosInstance.get(`/dog/getAllDogs`);
  return serverResponse;
}

export async function fetchMyDogs() {
  const serverResponse = await axiosInstance.get(`/dog/getMyDogs`);
  return serverResponse;
}

export async function fetchAllBreeds() {
  const serverResponse = await axios.get('https://api.thedogapi.com/v1/breeds');
  return serverResponse;
}

export async function fetchFavoriteDogs() {
  const serverResponse = await axiosInstance.get(`/dog/getFavoriteDogs`);
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
  const serverResponse = await axiosInstance.post(`/dog/editDog`, {
    data,
    _id: dogId,
  });
  return serverResponse;
}

export async function changePassword({
  token,
  newPassword,
}: {
  token: string;
  newPassword: string;
}) {
  const serverResponse = await axiosInstance.post('/user/changePassword', {
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
  const serverResponse = await axiosInstance.post('/user/login', {
    email,
    password,
  });
  return serverResponse;
}

export async function sendEmailVerification({
  email,
  password,
  username,
  phoneNumber,
}: sendEmailPropsType) {
  const serverResponse = await axiosInstance.post('/user/verification', {
    username,
    password,
    email,
    phoneNumber,
  });
  return serverResponse;
}

export async function sendChangePasswordEmail(email: string) {
  const serverResponse = await axiosInstance.post('/user/forgotPassword', {
    email,
  });
  return serverResponse;
}

export async function addDog(data: DogFormData) {
  const serverResponse = await axiosInstance.post(`/dog/addDog`, {
    data,
  });
  return serverResponse;
}

export async function addFavorteDog(dogId: string) {
  const serverResponse = await axiosInstance.post(`/dog/addFavoriteDog`, {
    dogId,
  });
  return serverResponse;
}

//delete

export async function deleteDog(dogId: string) {
  const serverResponse = await axiosInstance.post(`/dog/deleteDog`, {
    id: dogId,
  });
  return serverResponse;
}

export async function deleteFavoriteDog(dogId: string) {
  const serverResponse = await axiosInstance.post(`/dog/deleteFavoriteDog`, {
    dogId,
  });
  return serverResponse;
}

//

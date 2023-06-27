import axios from 'axios';
import axiosInstance from '../utils/apiService/axiosInstance';

export async function adminDeleteDog({
  dogId,
  username,
}: {
  dogId: string;
  username: string;
}) {
  const serverResponse = await axiosInstance.post(`/dog/deleteDog`, {
    id: dogId,
    adminRequestedUsername: username,
  });
  return serverResponse;
}

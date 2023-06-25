import axios from 'axios';
import { SERVER_URL } from '../utils/data/data';

export async function adminDeleteDog({
  dogId,
  username,
}: {
  dogId: string;
  username: string;
}) {
  const serverResponse = await axios.post(
    SERVER_URL + `/dog/deleteDog`,
    { id: dogId, adminRequestedUsername: username },
    {
      withCredentials: true,
    }
  );
  return serverResponse;
}

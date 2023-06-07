import { useQuery } from 'react-query';
import axios from 'axios';

function useGetBreeds() {
  const getBreeds = async () => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/breeds');
      return response.data;
    } catch (err) {
      return [];
    }
  };
  const { data: dogBreedsArray = [] } = useQuery(['breeds'], getBreeds, {
    staleTime: Infinity,
  });

  return { dogBreedsArray };
}

export default useGetBreeds;

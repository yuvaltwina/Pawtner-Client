import React from 'react';
import { fetchFavoriteDogs } from '../../../utils/apiService/axiosRequests';
import { useQuery } from 'react-query';

function useGetFavoriteDogs() {
  const getFavoriteDogsQuery = useQuery(['favoriteDogs'], fetchFavoriteDogs);
  return getFavoriteDogsQuery;
}

export default useGetFavoriteDogs;

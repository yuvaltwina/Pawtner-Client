import React from 'react';
import { fetchFavoriteDogs } from '../../../utils/apiService/axiosRequests';
import { useQuery } from 'react-query';
import { useGlobalContext } from '../../useContext';

function useGetFavoriteDogs() {
  const {
    userDetails: { username },
  } = useGlobalContext();

  return useQuery(['favoriteDogs'], fetchFavoriteDogs, {
    enabled: !!username,
  });
}

export default useGetFavoriteDogs;

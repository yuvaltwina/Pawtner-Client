import React from 'react';
import { fetchAllDogs } from '../../../utils/apiService/axiosRequests';
import { useQuery } from 'react-query';

function useGetAllDogs() {
  return useQuery(['allDogs'], fetchAllDogs);
}

export default useGetAllDogs;

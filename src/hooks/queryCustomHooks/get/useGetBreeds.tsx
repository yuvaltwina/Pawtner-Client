import React from 'react';
import { fetchAllBreeds } from '../../../utils/apiService/axiosRequests';
import { useQuery } from 'react-query';

function useGetBreeds() {
  return useQuery(['breeds'], fetchAllBreeds, {
    staleTime: Infinity,
  });
}

export default useGetBreeds;

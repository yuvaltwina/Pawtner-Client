import { useQuery, useQueryClient } from 'react-query';
import {
  fetchAllBreeds,
  fetchFavoriteDogs,
} from '../../../utils/apiService/axiosRequests';

type QueryResult = {
  data: any;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};
type QueriesType = {
  breeds: QueryResult;
  favoriteDogs: QueryResult;
};
export const useGetFetchQuery = (key: keyof QueriesType) => {
  const queries: QueriesType = {
    breeds: useQuery(['breeds'], fetchAllBreeds, {
      staleTime: Infinity,
    }),

    favoriteDogs: useQuery(['favoriteDogs'], fetchFavoriteDogs),
  };

  return queries[key] as QueryResult;
};

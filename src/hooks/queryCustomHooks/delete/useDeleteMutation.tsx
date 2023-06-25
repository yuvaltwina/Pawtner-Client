import React from 'react';
import { toast } from 'react-hot-toast';
import { UseMutationResult, useMutation } from 'react-query';
import {
  deleteDog,
  deleteFavoriteDog,
} from '../../../utils/apiService/axiosRequests';
import { AxiosResponse } from 'axios';
import { DogFormData } from '../../../utils/types/type';
import { adminDeleteDog } from '../../../admin/AdminApiService';

type MutationsType = {
  deleteDogMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    string
  >;
  deleteFavoriteMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
  adminDeleteDogMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      dogId: string;
      username: string;
    },
    string
  >;
};
function useDeleteMutation(
  onSuccess: Function,
  onError: Function
): MutationsType {
  const deleteDogMutation = useMutation({
    mutationFn: deleteDog,
    onError: (error, variabels, context) => {
      onError(error, context as string); //לפתור את זה למה זה יכול להיות אנדפייינד
    },
    onSuccess: (data, variabels, context) => {
      onSuccess(context as string);
    },
    onMutate: () => {
      const loadingDogToast = toast.loading('Deleting dog post');
      return loadingDogToast;
    },
  });
  const deleteFavoriteMutation = useMutation({
    mutationFn: deleteFavoriteDog,
    onError: (error) => {
      onError(error);
    },
    onSuccess: () => {
      onSuccess();
    },
  });
  const adminDeleteDogMutation = useMutation({
    mutationFn: adminDeleteDog,
    onError: (error, variabels, context) => {
      onError(error, context as string); //לפתור את זה למה זה יכול להיות אנדפייינד
    },
    onSuccess: (data, variabels, context) => {
      onSuccess(context as string);
    },
    onMutate: () => {
      const loadingDogToast = toast.loading('Deleting dog post');
      return loadingDogToast;
    },
  });
  return {
    deleteDogMutation,
    deleteFavoriteMutation,
    adminDeleteDogMutation,
  };
}

export default useDeleteMutation;

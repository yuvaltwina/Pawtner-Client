import React from 'react';
import { toast } from 'react-hot-toast';
import { UseMutationResult, useMutation } from 'react-query';
import {
  addDog,
  addFavorteDog,
  checkLoginDetails,
  sendChangePasswordEmail,
} from '../../../utils/apiService/axiosRequests';
import { AxiosResponse } from 'axios';
import { DogFormData } from '../../../utils/types/type';

type MutationsType = {
  createDogMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    DogFormData,
    string
  >;
  addFavoriteMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
  >;
  sendForgotPasswordEmailMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    string
  >;
  checkLoginDetailsMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      email: string;
      password: string;
    },
    unknown
  >;
};

function usePostMutation(
  key: keyof MutationsType,
  onSuccess: Function,
  onError: Function
) {
  const checkLoginDetailsMutation = useMutation({
    mutationFn: checkLoginDetails,
    onError: (error) => onError(error),
    onSuccess: (data, variabels, context) => {
      onSuccess(data);
    },
  });

  const sendForgotPasswordEmailMutation = useMutation({
    mutationFn: sendChangePasswordEmail,
    onError: (error, variabels, context) => {
      onError(error, context as string); //לפתור את זה למה זה יכול להיות אנדפייינד
    },
    onSuccess: (data, variabels, context) => {
      onSuccess(context as string);
    },
    onMutate: () => {
      const loadingDogToast = toast.loading('loading...');
      return loadingDogToast;
    },
  });

  const createDogMutation = useMutation({
    mutationFn: addDog,
    onError: (error, variabels, context) => {
      onError(error, context as string); //לפתור את זה למה זה יכול להיות אנדפייינד
    },
    onSuccess: (data, variabels, context) => {
      onSuccess(context as string);
    },
    onMutate: () => {
      const loadingDogToast = toast.loading('Creating dog post');
      return loadingDogToast;
    },
  });

  const addFavoriteMutation = useMutation({
    mutationFn: addFavorteDog,
    onError: (error) => onError(error),
    onSuccess: () => onSuccess(),
  });

  const postMutations: MutationsType = {
    createDogMutation,
    addFavoriteMutation,
    sendForgotPasswordEmailMutation,
    checkLoginDetailsMutation,
  };
  return postMutations[key];
}

export default usePostMutation;

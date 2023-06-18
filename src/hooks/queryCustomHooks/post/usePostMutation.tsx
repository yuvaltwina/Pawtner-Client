import React from 'react';
import { UseMutationResult, useMutation } from 'react-query';
import {
  addDog,
  addFavorteDog,
  checkLoginDetails,
  sendChangePasswordEmail,
  sendEmailVerification,
} from '../../../utils/apiService/axiosRequests';
import { AxiosResponse } from 'axios';
import { DogFormData } from '../../../utils/types/type';
import { toast } from 'react-hot-toast';
import { LOADING_MESSAGE } from '../../../utils/data/data';

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
  sendVerificationEmailMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      email: string;
      password: string;
      username: string;
      phoneNumber: string;
    },
    string
  >;
};

function usePostMutation(
  onSuccess: Function,
  onError: Function
): MutationsType {
  const sendVerificationEmailMutation = useMutation({
    mutationFn: sendEmailVerification,
    onError: (error, variabels, context) => {
      onError(error, context as string); //לפתור את זה למה זה יכול להיות אנדפייינד
    },
    onSuccess: (data, variabels, context) => {
      onSuccess(context as string);
    },
    onMutate: () => {
      const loadingDogToast = toast.loading(LOADING_MESSAGE);
      return loadingDogToast;
    },
  });

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
      const loadingDogToast = toast.loading(LOADING_MESSAGE);
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

  return {
    createDogMutation,
    addFavoriteMutation,
    sendForgotPasswordEmailMutation,
    checkLoginDetailsMutation,
    sendVerificationEmailMutation,
  };
}

export default usePostMutation;

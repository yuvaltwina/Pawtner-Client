import React from 'react';
import { UseMutationResult, useMutation } from 'react-query';
import {
  changePassword,
  editDog,
} from '../../../utils/apiService/axiosRequests';

import { AxiosResponse } from 'axios';
import { EditDogFormData } from '../../../utils/types/type';
import { toast } from 'react-hot-toast';

interface MutationsType {
  updateDogMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      data: EditDogFormData;
      dogId: string;
    },
    string
  >;
  changePasswordMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    {
      token: string;
      newPassword: string;
    },
    string
  >;
}

function useUpdateMutation(
  onSuccess: Function,
  onError: Function
): MutationsType {
  const updateDogMutation = useMutation({
    mutationFn: editDog,
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

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
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

  return { updateDogMutation, changePasswordMutation };
}

export default useUpdateMutation;

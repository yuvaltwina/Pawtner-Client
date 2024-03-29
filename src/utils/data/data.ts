import { DogFormData } from '../types/type';
export const SERVER_URL = 'https://pawtner-server.onrender.com';
export const WEBSITE_URL = 'https://pawtner.vercel.app';
// export const WEBSITE_URL = 'http://localhost:5173';
// export const SERVER_URL = 'http://localhost:3000';
export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // atleast 8 characters , must one letter, must one number
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const EMAIL_ERROR_MESSAGE = 'please provide a valid Email address';

export const SELECT_BUTTONS_DATA: {
  category: keyof DogFormData;
  valuesArray: string[];
}[] = [
  {
    category: 'size',
    valuesArray: [
      'Small (0-25 lbs)',
      'Medium (26-60 lbs)',
      'Large (61-100 lbs)',
      'Extra Large (101 lbs or more)',
    ],
  },
  {
    category: 'age',
    valuesArray: [
      'Puppy (0-1 years)',
      'Young (1-3 years)',
      'Adult (3-7 years)',
      'Senior (7+ years)',
    ],
  },

  { category: 'gender', valuesArray: ['Male', 'Female'] },
];
export const EMPTY_STRING = '';
export const LOADING_MESSAGE = 'Loading...';

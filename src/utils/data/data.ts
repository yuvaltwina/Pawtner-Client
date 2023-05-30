import { DogFormData } from '../types/type';
import { cityOptions } from './cities';

export const SERVER_URL = 'http://localhost:3000';
export const WEBSITE_URL = 'http://localhost:5173';

export const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // atleast 8 characters , must one letter, must one number
export const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const EMAIL_ERROR_MESSAGE = 'please provide a valid Email address';

export const SELECT_BUTTONS_DATA = [
  {
    category: 'breed',
    valuesArray: [
      'Golden retriver',
      'Random dog breed 1',
      'Random dog breed 2',
      'Random dog breed 3',
    ],
  },
  { category: 'gender', valuesArray: ['Male', 'Female'] },
  { category: 'age', valuesArray: ['Puppy', 'Young', 'Adult', 'Senior'] },
  {
    category: 'size',
    valuesArray: [
      'Small (0-25 lbs)',
      'Medium (26-60 lbs)',
      'Large (61-100 lbs)',
      'Extra Large (101 lbs or more)',
    ],
  },
  // {
  //   category: 'city',
  //   valuesArray: cityOptions,
  // },
];
//קוד כפול זה בדיוק כמו הרשימה שמעליו רק בלי קטגוריה ריינג
export const ADD_DOG_SELECT_BUTTONS: {
  category: keyof DogFormData;
  valuesArray: string[];
}[] = [
  {
    category: 'breed',
    valuesArray: [
      'Golden retriver',
      'Random dog breed 1',
      'Random dog breed 2',
      'Random dog breed 3',
    ],
  },
  { category: 'gender', valuesArray: ['Male', 'Female'] },
  { category: 'age', valuesArray: ['Puppy', 'Young', 'Adult', 'Senior'] },
  {
    category: 'size',
    valuesArray: [
      'Small (0-25 lbs)',
      'Medium (26-60 lbs)',
      'Large (61-100 lbs)',
      'Extra Large (101 lbs or more)',
    ],
  },
];

export interface Navigate {
  toForgorPasswordPage: () => void;
  toSignupPage: () => void;
  toLoginPage: () => void;
}
export type PrefrencesButtonValuesObj = {
  [key: string]: string[];
};
export type Category = { category: string };

export interface DogFormData {
  breed: string;
  gender: string;
  age: string;
  size: string;
  name: string;
  about: string;
  city: string;
}

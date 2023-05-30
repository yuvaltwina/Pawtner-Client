export interface Navigate {
  toForgorPasswordPage: () => void;
  toSignupPage: () => void;
  toLoginPage: () => void;
}
export type PrefrencesButtonValuesObj = {
  [key: string]: string[];
};
export type Category = { category: string };
export interface filterDataInitialObjectType {
  breed: string[];
  gender: string[];
  age: string[];
  size: string[];
  city: string[];
}
export interface DogFormData {
  breed: string;
  gender: string;
  age: string;
  size: string;
  name: string;
  about: string;
  city: string;
  images: { base64String: string; url: string }[];
}
export interface SingleDogFullData {
  _id: string;
  about: string;
  age: string;
  breed: string;
  city: string;
  email: string;
  gender: string;
  imagesUrl: string[];
  likedBy: string[];
  name: string;
  phoneNumber: string;
  size: string;
  username: string;
}
export interface EditDogFormData {
  breed: string;
  gender: string;
  age: string;
  size: string;
  name: string;
  about: string;
  city: string;
  images: [];
}

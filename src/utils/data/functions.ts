import { SingleDogFullData } from '../types/type';

export const capitalizeOnlyFirstChars = (str: string) => {
  const words = str.toLowerCase().split(' ');
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });
  return capitalizedWords.join(' ');
};
export const getBase64 = (
  file: File,
  cb: (result: string, isError: boolean, file: File) => void
) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result as string, false, file);
  };
  reader.onerror = function (error) {
    cb(error.toString(), true, file);
  };
};
export const phoneNumberFormating = (str: string) => {
  const phoneFormatString =
    str.slice(0, 3) + '-' + str.slice(3, 6) + '-' + str.slice(6);
  return phoneFormatString;
};

// export const reloadAfterSecond = () => {
//   setTimeout(() => {
//     window.location.reload();
//   }, 1000);
// };

export const getDogById = (targetId: string, allDogs: SingleDogFullData[]) => {
  const dog = allDogs.filter((dog) => dog._id === targetId);
  return dog[0];
};

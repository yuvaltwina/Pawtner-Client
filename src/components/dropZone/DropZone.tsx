import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { RiCloseFill, RiFolderAddLine } from 'react-icons/ri';
import './DropZone.css';
import { toast } from 'react-hot-toast';
import { AiOutlinePlus } from 'react-icons/ai';

const MAX_SIZE = 5 * 1024 * 1024;

function DropZone({
  images,
  setImages,
  isError,
}: {
  images: { file: File; url: string }[];
  setImages: React.Dispatch<
    React.SetStateAction<{ file: File; url: string }[]>
  >;
  isError: boolean;
}) {
  const isImageExist = images.length > 0;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length > 2) {
        return;
      }
      if (!acceptedFiles[0]) {
        toast.error(' File exceeded the maximum size or not an image');
        return;
      }
      const newImage = {
        file: acceptedFiles[0],
        url: URL.createObjectURL(acceptedFiles[0]),
      };
      setImages((prevImages) => [...prevImages, newImage]);
    },
    [images]
  );
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg'],
      'image/jpg': ['.jpg'],
      'image/png': ['.png'],
      'image/avif': ['.avif'],
    },
    multiple: true,
    disabled: images.length > 2,
    maxSize: MAX_SIZE,
  });
  const displayBeforeDrop = () => {
    if (isImageExist) {
      return;
    }
    const titleText = isDragActive
      ? 'Drop the dog photo here'
      : ' Upload your dog photos here';
    return (
      <div className="dropzone-before-drop">
        <span className="dropzone-before-icon">
          <RiFolderAddLine />
        </span>
        <h1 className="dropzone-before-title">{titleText}</h1>
        <h3 className="dropzone-before-subtitle">
          Drag and drop,or click to select
        </h3>
      </div>
    );
  };

  const handleDelete = (url: string) => {
    const newImage = images.filter((image) => image.url !== url);
    setImages(newImage);
  };

  const displayImages = () => {
    if (!isImageExist) {
      return;
    }
    const displayImages = images.map((image) => {
      const { url } = image;
      return (
        <span key={url} className={`dropzone-image-container`}>
          <RiCloseFill
            className="dropzone-delete-icon"
            onClick={() => {
              handleDelete(url);
            }}
          />
          <img className="dropzone-image" src={url}></img>
        </span>
      );
    });
    return <div className="dropzone-images-container">{displayImages}</div>;
  };

  const dropZoneValidClass = isDragActive && isDragAccept ? 'valid' : '';
  const dropZoneErrorClass = isDragActive && isDragReject ? 'notvalid' : '';
  const dropZoneBorderClass = dropZoneValidClass + ' ' + dropZoneErrorClass;
  const errorBorder = isError ? 'dropzone-error' : '';

  const displayDropZone = () => {
    if (images.length > 2) {
      return;
    }
    if (isImageExist) {
      return (
        <div
          className={`dropzone-squre ${dropZoneBorderClass}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <AiOutlinePlus className="dropzone-plus-icon" />
        </div>
      );
    }
    return (
      <div className={'dropzone-full-space'} {...getRootProps()}>
        <input {...getInputProps()} />
      </div>
    );
  };

  return (
    <div
      className={`dropzone ${
        !isImageExist && dropZoneBorderClass
      } ${errorBorder}`}
    >
      {displayBeforeDrop()}
      {displayImages()}
      {displayDropZone()}
    </div>
  );
}

export default DropZone;

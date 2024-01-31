import React from 'react';
import Cropper from 'react-easy-crop';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import css from './editImage.module.scss';
import { useEditImage } from './useEditImage';

interface EditImageModalProps {
  open: boolean;
  handleClose: () => void;
  type: 'avatar' | 'header';
}
export const EditImageModal: React.FC<EditImageModalProps> = ({ open, handleClose, type }) => {
  const {
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    saveImage,
    imageURL,
    handleChangePhoto,
    uploadError,
    handleRemovePhoto,
    cropperSize,
  } = useEditImage(handleClose, type);

  const modalFooterJsx = (
    <div className="w-full flex flex-col gap-3  px-4 py-4 md:px-6 md:py-6">
      {uploadError && <span className={css.errorMsg}>{uploadError}</span>}
      <div className="w-full flex flex-col md:flex-row-reverse gap-3 md:justify-start">
        <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={saveImage}>
          Save
        </Button>
        <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={handleChangePhoto}>
          Change photo
        </Button>
        <Button
          variant="text"
          color="error"
          //  className=""
          customStyle="md:ml-0 md:mr-auto text-Error-700"
          onClick={handleRemovePhoto}
        >
          Delete Photo
        </Button>
      </div>
    </div>
  );

  const cropperContentJsx = (
    <div className={css.cropContainer}>
      <div className={css.cropAbsolute}>
        <Cropper
          image={imageURL}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          cropSize={cropperSize}
        />
      </div>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={type === 'avatar' ? 'Edit profile photo' : 'Edit header image'}
      subTitle={
        type === 'avatar' ? 'Upload a square image for best results.' : 'Upload a 1600 x 480px image for best results.'
      }
      content={cropperContentJsx}
      footer={modalFooterJsx}
    />
  );
};

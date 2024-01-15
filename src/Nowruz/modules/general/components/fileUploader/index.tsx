import { Typography } from '@mui/material';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './fileUploader.module.scss';
import { FileUploaderProps } from './fileUploader.types';
import { useFileUploader } from './useFileUploader';

export const FileUploader: React.FC<FileUploaderProps> = ({
  customStyle,
  fileTypes,
  maxFileSize = 10,
  maxFileNumbers = 1,
  setAttachments,
}) => {
  const { getRootProps, getInputProps, getSubtitle, error, fileName } = useFileUploader(
    fileTypes,
    maxFileNumbers,
    maxFileSize,
    setAttachments,
  );

  return (
    <>
      <div {...getRootProps()} className={`${css.container} ${customStyle}`}>
        <input {...getInputProps()} />
        <Icon name="upload-cloud-02" fontSize={20} className="text-Gray-light-mode-600" />
        <div className="flex">
          <Typography variant="subtitle2" className="text-Brand-700">
            Click to upload
          </Typography>
          <Typography variant="caption" className="text-Gray-light-mode-600">
            or drag and drop
          </Typography>
        </div>
        <p className={css.subtitle}>{getSubtitle()}</p>
      </div>
      {error && (
        <Typography variant="caption" className="text-Error-600">
          {error}
        </Typography>
      )}
      {fileName && (
        <Typography variant="caption" className="text-Gray-light-mode-600">
          {fileName}
        </Typography>
      )}
    </>
  );
};

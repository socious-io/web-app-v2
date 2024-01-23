import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
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
        <Icon name="upload-cloud-02" fontSize={20} color={variables.color_grey_600} />
        <div className="flex">
          <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
            Click to upload
          </Typography>
          <Typography variant="caption" color={variables.color_grey_600}>
            or drag and drop
          </Typography>
        </div>
        <p className={css.subtitle}>{getSubtitle()}</p>
      </div>
      {error && (
        <Typography variant="caption" color={variables.color_error_600}>
          {error}
        </Typography>
      )}
      {fileName && (
        <Typography variant="caption" color={variables.color_grey_600}>
          {fileName}
        </Typography>
      )}
    </>
  );
};

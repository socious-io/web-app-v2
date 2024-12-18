import { Typography } from '@mui/material';
import React from 'react';
import { translate } from 'src/core/utils';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { FileUploaderProps } from './index.types';
import { useFileUploader } from './useFileUploader';
import { FeaturedIcon } from '../featuredIcon-new';

export const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onDropFiles,
  fileTypes,
  showPreviewImages = false,
  showFileName = true,
  deleteOnFileName = false,
  onDeleteFiles,
  maxSize = 10,
  maxFiles = 1,
  multiple = true,
  error = '',
  customStyle,
}) => {
  const { getRootProps, getInputProps, subtitle, errorMessage } = useFileUploader(
    files,
    onDropFiles,
    fileTypes,
    maxSize,
    maxFiles,
    multiple,
    error,
  );

  return (
    <>
      <div {...getRootProps()} className={`${styles['container']} ${customStyle}`}>
        <input {...getInputProps()} />
        <FeaturedIcon iconName="upload-cloud-02" size="md" type="modern" theme="gray" />
        <div className="flex mt-2">
          <Typography variant="subtitle2" color={variables.color_primary_700} className="700 mr-1">
            {translate('general-file-uploader.click')}
          </Typography>
          <Typography variant="caption" color={variables.color_grey_600}>
            {translate('general-file-uploader.drag')}
          </Typography>
        </div>
        <p className={styles['subtitle']}>{subtitle}</p>
      </div>
      {errorMessage && (
        <Typography variant="caption" color={variables.color_error_600}>
          {errorMessage}
        </Typography>
      )}
      {showFileName && files.some(file => file.name) && (
        <div className={styles['col']}>
          {files.map(file => (
            <div key={file.id} className={styles['name']}>
              <Typography variant="caption" color={variables.color_grey_600}>
                {file.name}
              </Typography>
              {deleteOnFileName && (
                <Icon
                  name="x-close"
                  color={variables.color_grey_700}
                  fontSize={16}
                  cursor="pointer"
                  onClick={() => onDeleteFiles?.(file.id)}
                />
              )}
            </div>
          ))}
        </div>
      )}
      {showPreviewImages && files.some(file => file.url) && (
        <div className={styles['row']}>
          {files.map(file => (
            <div key={file.id} className={styles['preview']}>
              <img src={file.url} className={styles['preview__image']} />
              <div className={styles['preview__delete']} onClick={() => onDeleteFiles?.(file.id)}>
                <Icon name="x-close" color={variables.color_grey_700} fontSize={16} cursor="pointer" />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

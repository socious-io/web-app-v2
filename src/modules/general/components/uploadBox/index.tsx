import React from 'react';

import styles from './index.module.scss';
import { UploadBoxProps } from './index.types';
import { Button } from '../Button';
import { FeaturedIcon } from '../featuredIcon-new';

const UploadBox: React.FC<UploadBoxProps> = ({
  onUpload,
  title = 'or drag and drop',
  subtitle = 'PNG, JPG or GIF (max. 10MB)',
  errorMessage = '',
  customStyle = '',
}) => {
  const contentJSX = (
    <>
      <input name="file" type="file" className={styles['file']} onChange={onUpload} />
      <div className="flex flex-col items-center gap-3">
        <FeaturedIcon iconName="upload-cloud-02" size="lg" theme="gray" type="modern" />
        <div className="flex flex-col items-center gap-1">
          <div className={styles['title']}>
            Click to upload {title && <span className={styles['title--gray']}>{title}</span>}
          </div>
          {subtitle && <span className={styles['subtitle']}>{subtitle}</span>}
        </div>
      </div>
    </>
  );

  const errorJSX = (
    <div className="flex flex-col items-center gap-4">
      <FeaturedIcon iconName="search-lg" size="lg" theme="gray" type="modern" />
      <div className="flex flex-col items-center gap-1">
        <span className={styles['title--error']}>Something went wrong</span>
        <span className={styles['subtitle--error']}>{errorMessage}</span>
      </div>
      <div className="relative flex items-center justify-center mt-2 cursor-pointer">
        <Button variant="outlined" color="info">
          Try again
        </Button>
        <input name="file" type="file" className={styles['file']} onChange={onUpload} />
      </div>
    </div>
  );

  return <div className={`${styles['container']} ${customStyle}`}>{errorMessage ? errorJSX : contentJSX}</div>;
};

export default UploadBox;

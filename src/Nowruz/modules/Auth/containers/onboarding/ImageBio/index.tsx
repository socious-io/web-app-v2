import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './image-bio.module.scss';
import { useImageBio } from './useImageBio';

export const ImageBio = () => {
  const { updateBio, onUploadImage } = useImageBio();

  return (
    <div className="flex flex-col items-stretch">
      <IntroHeader
        title="Showcase yourself with a profile photo"
        description="Add a profile photo to help build trust and highlight who you are."
      />
      <div className="flex justify-center mt-5">
        <Avatar size="96px" type="users" />
      </div>
      <div className={css.uploadBox}>
        <FeaturedIcon src="/icons/upload.svg" />
        <Button color="primary" variant="text" onClick={onUploadImage}>
          Click to upload
        </Button>
        <div className={css.uploadText}>PNG, JPG or GIF (max. 2MB)</div>
      </div>
      <div className="my-5">
        <Divider />
      </div>
      <Input
        label="Headline"
        // customHeight="128px"
        variant="outlined"
        placeholder="eg."
        multiline
        onChange={(e) => updateBio(e.target.value)}
      />
      <div className="mt-6 mb-2">
        <Button color="primary" block onClick={() => console.log('submit')}>
          Continue
        </Button>
      </div>
    </div>
  );
};

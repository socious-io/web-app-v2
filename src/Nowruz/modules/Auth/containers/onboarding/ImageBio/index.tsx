import Divider from '@mui/material/Divider';
import React, { useContext, useState } from 'react';
import { StepsContext } from 'src/Nowruz/modules/Auth/containers/onboarding/Stepper';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './image-bio.module.scss';

export const ImageBio = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { state, updateUser } = useUser();
  const updateBio = (bio: string) => {
    if (bio.length <= 160) updateUser({ ...state, bio });
    console.log(state);
  };
  return (
    <div>
      Showcase yourself with a profile photo Add a profile photo to help build trust and highlight who you are.
      <div className={css.user}>
        <img src="/icons/user-outlined.svg" width="48px" height="48px" />
      </div>
      <div className={css.uploadBox}>
        <div className={css.uploadLogoContainer}>
          <img src="/icons/upload.svg" width="20px" height="20px" />
        </div>
      </div>
      <Divider />
      <Input
        label="Headline"
        customHeight="128px"
        variant="outlined"
        placeholder="eg."
        multiline
        onChange={(e) => updateBio(e.target.value)}
      />
      <Button color="primary" block onClick={() => console.log('submit')}>
        Continue
      </Button>
    </div>
  );
};

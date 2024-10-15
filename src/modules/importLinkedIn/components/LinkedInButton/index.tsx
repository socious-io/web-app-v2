import React from 'react';

import css from './linkedInButton.module.scss';
import { LinkedInButtonProps } from './linkedInButton.types';

export const LinkedInButton: React.FC<LinkedInButtonProps> = ({ handleClick, disabled }) => {
  return (
    <button className={css.btn} onClick={handleClick} disabled={disabled}>
      <img src="/icons/nowruz/linkedin.svg" alt="" />
      Import your LinkedIn CV
    </button>
  );
};

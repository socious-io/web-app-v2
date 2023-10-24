import React from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Typography } from 'src/components/atoms/typography/typography';

import css from './fall-back.module.scss';

const FallBack = (): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.errorCode}>500</div>
      <div className={css.errorMsg}>Internal Server Error</div>
      <div className={css.errorDetails}>We apologize for the inconvenience. Please try again later</div>
      <div className={css.buttonContainer}>
        <Button className={css.button}>
          <a href="/" className={css.link}>
            Home Page
          </a>
        </Button>
      </div>
    </div>
  );
};

export default FallBack;

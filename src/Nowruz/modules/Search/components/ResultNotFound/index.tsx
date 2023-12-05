import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './result-not-found.module.scss';
import { ResultNotFoundProps } from './ResultNotFound.types';

export const ResultNotFound: React.FC<ResultNotFoundProps> = ({ name, message, buttonTitle, onClick }) => {
  return (
    <div className={css.container}>
      <div className={css.icon}>
        <Icon name="search-lg" fontSize={24} />
      </div>
      <div className={css.title}>{message}</div>
      <div className={css.message}>{name}</div>
      <Button color="primary" onClick={onClick}>
        {buttonTitle}
      </Button>
    </div>
  );
};

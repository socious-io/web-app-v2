import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './result-not-found.module.scss';
import { ResultNotFoundProps } from './ResultNotFound.types';
import { useResultNotFound } from './useResultNotFound';

export const ResultNotFound: React.FC<ResultNotFoundProps> = ({ type, searchTerm }) => {
  const { generateMessage, generateTextTitle, onClick, generatButtonText } = useResultNotFound();
  return (
    <div className={css.container}>
      <div className={css.icon}>
        <Icon name="search-lg" fontSize={24} />
      </div>
      <div className={css.title}>{generateTextTitle(type)}</div>
      {generateMessage(type, searchTerm)}
      <Button color="primary" onClick={() => onClick(type)}>
        {generatButtonText(type)}
      </Button>
    </div>
  );
};

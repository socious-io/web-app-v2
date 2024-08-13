import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';

import css from './result-not-found.module.scss';
import { ResultNotFoundProps } from './ResultNotFound.types';
import { useResultNotFound } from './useResultNotFound';

export const ResultNotFound: React.FC<ResultNotFoundProps> = ({ type, searchTerm, onClose }) => {
  const { generateMessage, generateTextTitle, onClick, generatButtonText } = useResultNotFound();
  return (
    <div className={css.container}>
      <div className={css.icon}>
        <Icon name="search-lg" fontSize={24} />
      </div>
      <div className={css.title}>{generateTextTitle(type)}</div>
      {generateMessage(type, searchTerm)}
      {type === 'projects' && (
        <Button
          color="primary"
          onClick={() => {
            onClose();
            onClick(type);
          }}
        >
          {generatButtonText(type)}
        </Button>
      )}
    </div>
  );
};

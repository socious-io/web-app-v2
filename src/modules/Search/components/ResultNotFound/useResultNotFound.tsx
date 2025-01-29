import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/utils';

import css from './result-not-found.module.scss';

export const useResultNotFound = () => {
  const navigate = useNavigate();

  const generateTextTitle = (type: string) => {
    let title = '';
    switch (type) {
      case 'users':
        title = translate('result-not-found.title.users');
        break;
      case 'organizations':
        title = translate('result-not-found.title.organizations');
        break;
      case 'projects':
        title = translate('result-not-found.title.projects');
        break;
    }
    return title;
  };

  const generateMessage = (type: string, searchTerm: string) => {
    let message: ReactNode | null = null;

    message = (
      <div className={css.message}>
        {translate('result-not-found.message', { searchTerm })}
        <br />
        {translate('result-not-found.suggestion')}
      </div>
    );

    return message;
  };

  const onClick = (type: string) => {
    navigate('/jobs');
  };

  const generatButtonText = (type: string) => {
    let text = '';
    text = translate('result-not-found.button.view-jobs');
    return text;
  };

  return { generateMessage, generateTextTitle, onClick, generatButtonText };
};

import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import css from './result-not-found.module.scss';

export const useResultNotFound = () => {
  const navigate = useNavigate();

  const generateTextTitle = (type: string) => {
    let title = '';
    switch (type) {
      case 'users':
        title = 'No people found';
        break;
      case 'organizations':
        title = 'No organizations found';
        break;
      case 'projects':
        title = 'No jobs found';
        break;
    }
    return title;
  };

  const generateMessage = (type: string, searchTerm: string) => {
    let message: ReactNode | null = null;

    message = (
      <div className={css.message}>
        Whoops! No results for &apos;{searchTerm}&apos;.
        <br />
        Let&apos;s try different keywords.
      </div>
    );

    return message;
  };
  const onClick = (type: string) => {
    navigate('/jobs');
  };
  const generatButtonText = (type: string) => {
    let text = '';
    text = 'View jobs';
    return text;
  };
  return { generateMessage, generateTextTitle, onClick, generatButtonText };
};

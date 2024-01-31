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
    }
    return title;
  };

  const generateMessage = (type: string, searchTerm: string) => {
    let message = null;

    switch (type) {
      case 'users':
        message = (
          <div className={css.message}>
            Whoops! No results for '{searchTerm}'.
            <br />
            Let's try different keywords.
          </div>
        );
        break;

      case 'organizations':
        message = (
          <div className={css.message}>
            Whoops! No results for '{searchTerm}'.
            <br />
            Let's try different keywords.
          </div>
        );
        break;
    }

    return message;
  };
  const onClick = (type: string) => {
    switch (type) {
      case 'users':
        navigate('/jobs');
        break;
      case 'organizations':
        navigate('/jobs');
        break;
    }
  };
  const generatButtonText = (type: string) => {
    let text = '';
    switch (type) {
      case 'users':
        text = 'Go to communities';
        break;
      case 'organizations':
        text = 'Go to communities';
        break;
    }
    return text;
  };
  return { generateMessage, generateTextTitle, onClick, generatButtonText };
};

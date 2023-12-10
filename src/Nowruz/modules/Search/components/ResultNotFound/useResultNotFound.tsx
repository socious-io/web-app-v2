import { useNavigate } from 'react-router-dom';

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
    let message = '';
    switch (type) {
      case 'users':
        message = `Whoops! No results for '${searchTerm}'.Let's try different keywords.`;
        break;
      case 'organizations':
        message = `Whoops! No results for '${searchTerm}'.Let's try different keywords.`;
        break;
    }
    return message;
  };
  const onClick = (type: string) => {
    switch (type) {
      case 'users':
        navigate('/');
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
        text = 'Go to jobs';
        break;
    }
    return text;
  };
  return { generateMessage, generateTextTitle, onClick, generatButtonText };
};

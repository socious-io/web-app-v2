import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/Nowruz/general/Button';

import { BackLinkProps } from './back-link.types';
export const BackLink: React.FC<BackLinkProps> = (props) => {
  const navigate = useNavigate();
  const { onBack, title } = props;
  const onClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      color="secondary"
      variant="text"
      startIcon={<img height={24} src="/icons/arrow-left.svg" />}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/Nowruz/general/Button';

import { BackLinkProps } from './back-link.types';
import css from './index.module.scss';

export const BackLink: React.FC<BackLinkProps> = ({ onBack, title, textStyle, ...props }) => {
  const navigate = useNavigate();

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
      className={css.button}
    >
      <Typography className={textStyle} {...props}>
        {title}
      </Typography>
    </Button>
  );
};

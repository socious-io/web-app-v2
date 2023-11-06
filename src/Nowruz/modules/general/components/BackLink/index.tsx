import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { BackLinkProps } from './back-link.types';
import css from './index.module.scss';

export const BackLink: React.FC<BackLinkProps> = (props) => {
  const navigate = useNavigate();
  const { onBack, title, block = false } = props;
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
      block
      fullWidth
      className={css.textButton}
    >
      {title}
    </Button>
  );
};

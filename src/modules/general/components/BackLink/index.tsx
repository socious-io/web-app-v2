import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/modules/general/components/Button';

import { BackLinkProps } from './back-link.types';
import css from './index.module.scss';
import { Icon } from '../Icon';

export const BackLink: React.FC<BackLinkProps> = props => {
  const navigate = useNavigate();
  const { onBack, title, block = false, customStyle } = props;
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
      startIcon={<Icon fontSize={24} name="arrow-left" className="text-Gray-light-mode-600" />}
      onClick={onClick}
      block={block}
      fullWidth
      className={`${css.textButton} ${customStyle}`}
    >
      {title}
    </Button>
  );
};

import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './closeButton.module.scss';

interface CloseButtonProps {
  handleClose: () => void;
  customStyle?: string;
}
export const CloseButton: React.FC<CloseButtonProps> = ({ handleClose, customStyle }) => {
  return (
    <button className={`${css.btn} ${customStyle}`} onClick={handleClose}>
      <Icon
        name="x-close"
        fontSize={20}
        className="text-Gray-light-mode-500 !cursor-pointer"
        containerClass="!cursor-pointer"
      />
    </button>
  );
};

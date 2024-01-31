import { Logo } from 'public/icons/nowruz/logo';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

interface ModalHeaderProps {
  title: string;
  subtitle: string;
  handleClose: () => void;
}
export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, subtitle, handleClose }) => {
  return (
    <div className="flex flex-col gap-3 md:gap-4  items-center justify-center">
      <Button
        variant="text"
        color="primary"
        className="absolute right-4 top-4 w-11 h-11 cursor-pointer p-[10px] min-w-11"
        onClick={handleClose}
      >
        <Icon name="x-close" fontSize={24} className="text-Gray-light-mode-500" />
      </Button>
      <Logo width={32} height={32} />
      <div className="flex flex-col items-center gap-1">
        <h1 className="font-semibold text-lg leading-7 text-Gray-light-mode-900">{title}</h1>
        <h2 className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</h2>
      </div>
    </div>
  );
};

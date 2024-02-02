import { Backdrop, Slide } from '@mui/material';
import React from 'react';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { CloseButton } from 'src/Nowruz/modules/general/components/closeButton';

import css from './sildeoutMenu.module.scss';
import { OverlayProps } from './slideoutMenu.types';

export const Overlay: React.FC<OverlayProps> = ({ open, onClose, children }) => {
  return (
    <>
      {open && (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'transparent' }} open={open}>
          <Slide direction="left" in={open} mountOnEnter unmountOnExit>
            <div className={css.container}>
              <div className={css.header}>
                <div className="hidden md:flex">
                  <CloseButton handleClose={onClose} />
                </div>
                <div className="flex md:hidden  mt-6 ml-4 mr-auto mb-auto">
                  <BackLink title="Back" onBack={onClose} customStyle="!w-fit" />
                </div>
              </div>
              <div className={css.content}>{children}</div>
            </div>
          </Slide>
        </Backdrop>
      )}
    </>
  );
};

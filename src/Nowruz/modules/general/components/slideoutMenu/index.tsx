import { Slide, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import variables from 'src/components/_exports.module.scss';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { CloseButton } from 'src/Nowruz/modules/general/components/closeButton';

import css from './sildeoutMenu.module.scss';
import { OverlayProps } from './slideoutMenu.types';

export const Overlay: React.FC<OverlayProps> = ({ open, onClose, children, title, subtitle }) => {
  const headerStyle = `${css.header} ${title || subtitle ? css.headerOverwrite : ``}`;
  const closeCustom = `${title || subtitle ? `${css.closeButtonOverwrite}` : ``}`;
  const ref = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return (
    <Slide direction="left" in={open} mountOnEnter unmountOnExit>
      <div ref={ref} className={css.container} id="notification">
        <div className={headerStyle}>
          {(title || subtitle) && (
            <div className={css.headerContent}>
              {title && (
                <Typography fontSize={20} color={variables.color_grey_900}>
                  {title}
                </Typography>
              )}
              {subtitle && (
                <Typography fontSize={14} color={variables.color_grey_600}>
                  {subtitle}
                </Typography>
              )}
            </div>
          )}
          {title || subtitle ? (
            <div>
              <CloseButton handleClose={onClose} customStyle={closeCustom} />
            </div>
          ) : (
            <>
              <div className="hidden md:flex">
                <CloseButton handleClose={onClose} customStyle={closeCustom} />
              </div>
              <div className="flex md:hidden  mt-6 ml-4 mr-auto mb-auto">
                <BackLink title="Back" onBack={onClose} customStyle="!w-fit" />
              </div>
            </>
          )}
        </div>
        <div className={css.content}>{children}</div>
      </div>
    </Slide>
  );
};

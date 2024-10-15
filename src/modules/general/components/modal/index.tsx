import { Backdrop, Divider, IconButton } from '@mui/material';
import React from 'react';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './modal.module.scss';
import { ModalProps } from './modal.types';

export const Modal: React.FC<ModalProps> = props => {
  const {
    open,
    handleClose,
    icon,
    title,
    subTitle,
    content,
    footer,
    mobileFullHeight = true,
    mobileCentered = false,
    children,
    headerDivider = true,
    footerDivider = true,
    customStyle,
    id = '',
    inlineTitle = true,
    contentClassName = '',
    closeButtonClassName = '',
    customTitleStyle = '',
  } = props;

  return (
    <>
      {open && (
        <Backdrop sx={{ zIndex: theme => theme.zIndex.drawer + 1, width: '100vw' }} open={open} id={id}>
          <div
            className={`${css.container} ${customStyle} ${
              mobileCentered ? css.mobileCentered : mobileFullHeight ? css.mobileFullHeight : css.mobileDefault
            }`}
          >
            <div className="w-full flex  gap-4 px-6 pt-6 relative top-0">
              {icon}
              {inlineTitle && (
                <div className={`flex-1 flex flex-col gap-1 justify-center items-start pb-5 ${customTitleStyle}`}>
                  {title && <h1 className={css.title}>{title}</h1>}
                  {subTitle && <h2 className={css.subtitle}>{subTitle}</h2>}
                </div>
              )}
              <IconButton
                className={`absolute top-3 right-3 ${css.closeBtn} ${closeButtonClassName}`}
                onClick={handleClose}
              >
                <Icon name="x-close" fontSize={24} color={variables.color_grey_500} cursor="pointer" />
              </IconButton>
            </div>
            {!inlineTitle && (
              <div
                className={`w-full px-6 pt-4 flex flex-col gap-1 justify-center items-start pb-5 ${customTitleStyle}`}
              >
                {title && <h1 className={css.title}>{title}</h1>}
                {subTitle && <h2 className={css.subtitle}>{subTitle}</h2>}
              </div>
            )}
            {headerDivider && <Divider className="w-full" />}
            <div className={`w-full overflow-y-auto ${contentClassName}`}>{content || children}</div>
            {footerDivider && <Divider className="w-full" />}
            {footer}
          </div>
        </Backdrop>
      )}
    </>
  );
};

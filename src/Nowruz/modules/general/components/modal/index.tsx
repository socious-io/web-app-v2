import { Backdrop, Divider, IconButton } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './modal.module.scss';
import { ModalProps } from './modal.types';

export const Modal: React.FC<ModalProps> = (props) => {
  const { open, handleClose, icon, title, subTitle, content, footer } = props;

  return (
    <>
      {open && (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
          <div className={`md:rounded-xl flex flex-col m-auto bg-Base-White z-30 ${css.container}`}>
            <div className="w-full flex gap-4 px-6 pt-6 relative top-0">
              {icon}
              <div className="flex-1 flex flex-col gap-1 justify-center items-start pb-5">
                <h1 className={css.title}>{title}</h1>
                <h2 className={css.subtitle}>{subTitle}</h2>
              </div>
              <IconButton className={`absolute top-3 right-3 ${css.closeBtn}`} onClick={handleClose}>
                <Icon name="x-close" fontSize={24} color={variables.color_grey_500} />
              </IconButton>
            </div>
            <Divider className="w-full" />
            <div className="w-full overflow-y-auto">{content}</div>
            <Divider className="w-full" />
            {footer}
          </div>
        </Backdrop>
      )}
    </>
  );
};

import { Modal } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './alert-modal.module.scss';
import { AlertModalProps } from './AlertModal.types';
export const AlertModal: React.FC<AlertModalProps> = ({
  open,
  onClose,
  message,
  customImage,
  title,
  onSubmit,
  closeButtn = true,
  closeButtonLabel = 'Close',
  submitButton = false,
  submitButtonLabel,
  customIcon,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <div className={css.container}>
        <div className="flex justify-between">
          {customIcon ? (
            customIcon
          ) : (
            <img className={css.image} src={customImage || '/icons/success-tick.svg'} alt="" />
          )}

          <Icon
            name="x-close"
            fontSize={24}
            color={variables.color_grey_500}
            className=" cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className={css.title}>{title}</div>
        <div className={css.message}>{message}</div>
        <div className="w-full flex flex-col md:flex-row gap-3">
          {closeButtn && (
            <Button color="secondary" variant="outlined" onClick={onClose} fullWidth>
              {closeButtonLabel}
            </Button>
          )}
          {submitButton && (
            <Button color="primary" variant="contained" onClick={onSubmit} fullWidth>
              {submitButtonLabel}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

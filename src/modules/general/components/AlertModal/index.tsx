import { Modal } from '@mui/material';
import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

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
  submitButtonTheme = 'primary',
  submitButtonLabel,
  customIcon,
  children,
  disableSubmitButton = false,
  customClassName,
  primaryBtnClassName,
  secondaryBtnClassName,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <div className={`${css.container} ${customClassName}`}>
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
        <div className={css.messageContainer}>
          {message.split('<br/>').map(substr => (
            <div key={substr} className={css.message}>
              {substr}
            </div>
          ))}
        </div>

        {children && <div className="w-full overflow-y-auto">{children}</div>}
        <div className="w-full flex flex-col md:flex-row-reverse gap-3">
          {submitButton && (
            <Button
              color={submitButtonTheme}
              variant="contained"
              onClick={onSubmit}
              fullWidth
              disabled={disableSubmitButton}
              customStyle={primaryBtnClassName}
            >
              {submitButtonLabel}
            </Button>
          )}
          {closeButtn && (
            <Button
              color="secondary"
              variant="outlined"
              onClick={onClose}
              fullWidth
              customStyle={secondaryBtnClassName}
            >
              {closeButtonLabel}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

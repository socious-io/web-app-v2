import { Modal } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './modalCentered.module.scss';
import { ModalCenteredProps } from './modalCentered.types';
export const ModalCentered: React.FC<ModalCenteredProps> = ({
  open,
  onClose,
  title,
  onSubmit,
  closeButtn = true,
  closeButtonLabel = 'Close',
  submitButton = false,
  submitButtonTheme = 'primary',
  submitButtonLabel,
  children,
  disableSubmitButton = false,
}) => {
  return (
    <Modal open={open} onClose={onClose} className={css.modal}>
      <div className={css.container}>
        <div className="flex justify-between">
          <div className={css.title}>{title}</div>
          <Icon
            name="x-close"
            fontSize={24}
            color={variables.color_grey_500}
            className=" cursor-pointer"
            onClick={onClose}
          />
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
            >
              {submitButtonLabel}
            </Button>
          )}
          {closeButtn && (
            <Button color="secondary" variant="outlined" onClick={onClose} fullWidth>
              {closeButtonLabel}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

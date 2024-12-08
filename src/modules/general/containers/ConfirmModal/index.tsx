import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import { Modal } from 'src/modules/general/components/modal';

import styles from './index.module.scss';
import { ConfirmModalProps } from './index.types';

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  handleClose,
  confirmHeader,
  confirmSubheader = '',
  buttons = [],
  headerDivider = false,
  mobileCentered = true,
  contentClassName = '',
  ...props
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      headerDivider={headerDivider}
      mobileCentered={mobileCentered}
      contentClassName={`${styles['content']} ${contentClassName}`}
      {...props}
    >
      <div className="flex flex-col gap-1">
        <span className={styles['content__title']}>{confirmHeader}</span>
        <span className={styles['content__subtitle']}>{confirmSubheader}</span>
      </div>
      {!!buttons.length && (
        <div className={styles['content__buttons']}>
          {buttons.map((button, index) => (
            <Button key={index} {...button} />
          ))}
        </div>
      )}
    </Modal>
  );
};

export default ConfirmModal;

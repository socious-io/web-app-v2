import React from 'react';
import { Modal } from 'src/components/templates/modal/modal';
import { Filters } from '..';
import css from './modal.module.scss';
import { Button } from 'src/components/atoms/button/button';
export const FiltersModal = ({ children, open, onClose }) => {
  return (
    <Modal height="100%" width="100%" open={open} onClose={onClose} className={css.modalContainer}>
      <div className={css.content}>
        {children}
        <Button onClick={onClose}>Submit</Button>
      </div>
    </Modal>
  );
};

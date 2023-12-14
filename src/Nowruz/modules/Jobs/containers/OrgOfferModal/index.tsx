import { Modal } from '@mui/material';
import React from 'react';
import Dapp from 'src/dapp';
import { Calender } from 'src/Nowruz/modules/general/components/Calender';

import css from './org-offer-modal.module.scss';
export const OrgOfferModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} className={css.container}>
      <div className={css.content}>
        <div className={css.header}>
          <span>Send an offer</span>
        </div>
        <div className={css.body}>
          {/* <Dapp.Connect /> */}
          <Calender />
        </div>
        <div className={css.footer}></div>
      </div>
    </Modal>
  );
};

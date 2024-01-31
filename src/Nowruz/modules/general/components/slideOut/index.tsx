import { Backdrop } from '@mui/material';
import React from 'react';

import { SlideOutProps } from './slideOut.types';

export const SlideOut: React.FC<SlideOutProps> = ({ open, handleClose, component }) => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose}>
      {component}
    </Backdrop>
  );
};

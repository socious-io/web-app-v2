import { IconButton, Snackbar, SnackbarContent } from '@mui/material';
import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import { CustomSnackbarProps } from './index.types';

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  anchorOrigin = { vertical: 'top', horizontal: 'center' },
  text,
  icon,
  containerClassName = '',
  textClassName = '',
  ...props
}) => {
  return (
    <Snackbar open={open} onClose={onClose} anchorOrigin={anchorOrigin} {...props}>
      <SnackbarContent
        className={`bg-Base-White flex items-start md:items-center py-0 px-2 rounded-xl min-w-[320px] ${containerClassName}`}
        message={
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
            {icon}
            <span className={`text-sm font-semibold text-Gray-light-mode-900 ${textClassName}`}>{text}</span>
          </div>
        }
        action={[
          <IconButton key="close" sx={{ mr: 0 }} onClick={e => onClose?.(e, 'clickaway')}>
            <Icon name="x-close" fontSize={20} className="text-Gray-light-mode-500" />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;

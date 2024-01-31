import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import * as React from 'react';
import variables from 'src/components/_exports.module.scss';

const CustomSwitch = styled(Switch)(({ theme, size }) => ({
  width: size === 'small' ? 36 : 44,
  height: size === 'small' ? 20 : 24,
  borderRadius: 12,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: size === 'small' ? 16 : 20,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: `translateX(${size === 'small' ? 16 : 20}px)`,
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: `translateX(${size === 'small' ? 16 : 20}px)`,
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.primary,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: size === 'small' ? 16 : 20,
    height: size === 'small' ? 16 : 20,
    borderRadius: 12,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 12,
    opacity: 1,
    backgroundColor: variables.color_grey_200,
    boxSizing: 'border-box',
  },
}));

export const ToggleButton: React.FC<SwitchProps> = (props) => {
  return <CustomSwitch {...props} />;
};

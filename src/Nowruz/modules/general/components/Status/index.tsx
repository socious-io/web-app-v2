import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import { StatusProps } from './index.types';
import { Chip } from '../Chip';
import { Dot } from '../dot';

const Status: React.FC<StatusProps> = ({ theme, icon, label, transparent = false }) => {
  const iconColor = {
    primary: variables.color_primary_500,
    success: variables.color_success_500,
    error: variables.color_error_500,
    warning: variables.color_warning_500,
    secondary: transparent ? variables.color_grey_600 : variables.color_grey_500,
  };

  return (
    <>
      <Chip
        startIcon={
          icon &&
          (icon === 'dot' ? (
            //FIXME: add dot icon
            <Dot size="small" color={iconColor[theme]} shadow={false} />
          ) : (
            <Icon name={icon} color={iconColor[theme]} fontSize={12} />
          ))
        }
        label={label}
        shape="round"
        theme={theme}
        size="sm"
        transparent={transparent}
      />
    </>
  );
};

export default Status;

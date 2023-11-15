import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon, IconProps } from 'src/Nowruz/general/Icon';

import css from './cardRadioButton.module.scss';

interface CardRadioButtonIconProps {
  selected: boolean;
  icon: IconProps;
}

export const CardRadioButtonIcon: React.FC<CardRadioButtonIconProps> = ({ selected, icon }) => {
  return (
    <div className={css.iconDiv}>
      <Icon name={icon.name} fontSize={icon.fontSize} color={selected ? variables.color_primary_600 : 'black'} />
    </div>
  );
};

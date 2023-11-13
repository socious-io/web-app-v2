import React from 'react';
import variables from 'src/components/_exports.module.scss';

import css from './cardRadioButton.module.scss';

interface CardRadioButtonIconProps {
  selected: boolean;
}

export const CardRadioButtonIcon: React.FC<CardRadioButtonIconProps & { Component: React.ComponentType }> = ({
  selected,
  Component,
}) => {
  return (
    <div className={css.iconDiv}>
      <Component stroke={selected ? variables.color_primary_600 : 'black'} width={16} height={18} />
    </div>
  );
};

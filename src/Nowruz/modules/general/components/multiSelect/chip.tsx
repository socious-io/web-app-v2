import React from 'react';

import css from './multiSelect.module.scss';
import { CustomChipProps } from './multiSelect.types';

const Chip: React.FC<CustomChipProps> = (props) => {
  const { label, onClick, icon, bgColor, fontColor, borderColor, customStyle } = props;
  return (
    <div
      className={`${css.chip} ${customStyle}`}
      style={{ borderColor: borderColor ? borderColor : '', backgroundColor: bgColor || '' }}
      onClick={() => onClick(label)}
    >
      <span className={css.chipLabel} style={{ color: fontColor || '' }}>
        {label}
      </span>
      <div style={{ marginRight: 0, marginLeft: 'auto' }}>{icon}</div>
    </div>
  );
};

export default Chip;

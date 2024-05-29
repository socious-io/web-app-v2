import React, { useState } from 'react';

import css from './buttonGroups.module.scss';
import { ButtonGroupsProps } from './buttonGroups.types';

export const ButtonGroups: React.FC<ButtonGroupsProps> = props => {
  const { buttons, activeIndex } = props;
  const [active, setActive] = useState(activeIndex || 0);

  const handleClick = async (index: number) => {
    await buttons[index].handleClick();
    setActive(index);
  };

  return (
    <div className={css.tabs}>
      {buttons.map((btn, index) => (
        <button
          key={btn.label}
          className={`${css.tab} ${index === active ? css.active : ''} ${
            buttons.length === 2 && index === 0 && css.divider
          }`}
          onClick={() => handleClick(index)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

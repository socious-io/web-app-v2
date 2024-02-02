import React, { useState } from 'react';

import css from './buttonGroups.module.scss';
import { ButtonGroupsProps } from './buttonGroups.types';

export const ButtonGroups: React.FC<ButtonGroupsProps> = (props) => {
  const { buttons } = props;
  const [active, setActive] = useState(0);

  const handleClick = async (index: number) => {
    await buttons[index].handleClick();
    setActive(index);
  };

  return (
    <>
      <div className={css.tabs}>
        {buttons.map((btn, index) => (
          <button
            key={btn.label}
            className={`${css.tab} ${index === active ? css.active : ''}`}
            onClick={() => handleClick(index)}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </>
  );
};

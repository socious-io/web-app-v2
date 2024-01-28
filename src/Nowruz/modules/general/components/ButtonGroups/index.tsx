import React, { ReactNode, useEffect, useState } from 'react';

import css from './buttonGroups.module.scss';
import { ButtonGroupsProps } from './buttonGroups.types';

export const ButtonGroups: React.FC<ButtonGroupsProps> = (props) => {
  const { tabs } = props;
  const [active, setActive] = useState(0);
  const [content, setContent] = useState<ReactNode>();
  useEffect(() => {
    setContent(tabs[active].content);
  }, [active]);

  return (
    <>
      <div className={css.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            className={`${css.tab} ${index === active ? css.active : ''}`}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className={`w-full h-full ${css.content}`}>{content}</div>
    </>
  );
};

import React, { ReactNode, useEffect, useState } from 'react';

import css from './horizontalButtonTabs.module.scss';
import { HorizontalButtonTabsProps } from './horizontalButtonTabs.types';

export const HorizontalButtonTabs: React.FC<HorizontalButtonTabsProps> = (props) => {
  const { tabs } = props;
  const [active, setActive] = useState(0);
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    setContent(tabs[active].content);
  }, [active, tabs]);

  return (
    <div className={`w-full h-full flex flex-col gap-8`}>
      <div className={css.tabContainer}>
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`${css.tab} ${index === active ? css.tabActive : ''}`}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="w-full h-full">{content}</div>
    </div>
  );
};

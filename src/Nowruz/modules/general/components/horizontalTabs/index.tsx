import React, { ReactNode, useEffect, useState } from 'react';

import css from './horizontalTabs.module.scss';
import { HorizontalTabsProps } from './horizontalTabs.types';

export const HorizontalTabs: React.FC<HorizontalTabsProps> = (props) => {
  const { tabs, leftAligned = true, containerCustomStyle, activeIndex = 0 } = props;

  const [active, setActive] = useState(activeIndex);
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    setContent(tabs[active].content);
  }, [activeIndex, active, tabs]);

  return (
    <div className={`w-full h-full flex flex-col gap-8 ${containerCustomStyle}`}>
      <div className={css.tabContainer}>
        {tabs.map((tab, index) => (
          <div
            key={`${tab.label}-${index.toString()}`}
            className={`${css.tab} ${index === active ? css.tabActive : ''} ${leftAligned ? '' : 'flex-1'}`}
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

import React, { ReactNode, useEffect, useState } from 'react';

import css from './horizontalTabs.module.scss';
import { HorizontalTabsProps } from './horizontalTabs.types';

export const HorizontalTabs: React.FC<HorizontalTabsProps> = (props) => {
  const { tabs, leftAligned = true, containerCustomStyle } = props;
  const [active, setActive] = useState(0);
  const [content, setContent] = useState<ReactNode>();

  useEffect(() => {
    setContent(tabs[active].content);
  }, [active, tabs]);

  return (
    <div className={`w-full h-full flex flex-col gap-8 ${containerCustomStyle}`}>
      <div className={css.tabContainer}>
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
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

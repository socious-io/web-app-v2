import React, { useEffect, useState } from 'react';

import css from './horizontalTabs.module.scss';
import { HorizontalTabsProps } from './horizontalTabs.types';

export const HorizontalTabs: React.FC<HorizontalTabsProps> = ({
  tabs,
  leftAligned = true,
  containerCustomStyle = '',
  activeIndex = 0,
  onActiveIndex,
}) => {
  const [active, setActive] = useState(activeIndex);

  useEffect(() => {
    setActive(activeIndex);
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    if (onActiveIndex) {
      onActiveIndex(index);
    } else {
      setActive(index);
    }
  };

  return (
    <div className={`w-full h-full flex flex-col gap-8 ${containerCustomStyle}`}>
      <div className={css.tabContainer}>
        {tabs.map((tab, index) => (
          <div
            key={`${tab.label}-${index.toString()}`}
            className={`${css.tab} ${index === active ? css.tabActive : ''} ${leftAligned ? '' : 'flex-1'}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="w-full h-full">{tabs[active]?.content}</div>
    </div>
  );
};

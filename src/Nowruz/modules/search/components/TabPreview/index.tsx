import React, { useState } from 'react';

import css from './tab-preview.module.scss';
import { TabPreviewProps, Tab } from './TabPreview.types';

export const TabPreview: React.FC<TabPreviewProps> = ({ tabs, onSelect, defaultTabIndex }) => {
  const [selectedTab, setSelectedTab] = useState<number | null>(defaultTabIndex !== undefined ? defaultTabIndex : null);

  const onSelectTab = (tabIndex: number) => {
    onSelect(tabs[tabIndex]);
    setSelectedTab(tabIndex);
  };

  return (
    <div className={css.tabContainer}>
      {tabs.map((tab: Tab, index) => (
        <div
          onClick={() => onSelectTab(index)}
          className={`${css.tab} ${selectedTab === index ? css.selectedTab : ''}`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

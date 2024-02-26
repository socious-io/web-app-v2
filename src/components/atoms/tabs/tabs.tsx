import { useState } from 'react';

import css from './tabs.module.scss';
import { TabsProps } from './tabs.types';

export const Tabs = ({ tabs, onClick, alignLeft }: TabsProps): JSX.Element => {
  const initialIndex = tabs.findIndex((tab) => tab.default);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialIndex);

  function onTabChange(name: string) {
    const i = tabs.findIndex((t) => t.name === name);
    return () => setSelectedIndex(i);
  }

  function setActiveClass(name: string): string {
    const i = tabs.findIndex((t) => t.name === name);
    return i === selectedIndex ? css.active : '';
  }

  const tab = tabs[selectedIndex];

  const headerClass = alignLeft ? css.headerLeft : css.header
  const itemClass = alignLeft ? css.tabItemLeft : css.tabItem

  return (
    <>
      <ul className={headerClass}>
        {tabs.map((tab) => (
          <li
            className={itemClass}
            key={tab.name}
            onClick={() => {
              onTabChange(tab.name)();
              onClick?.(tab.name);
            }}
          >
            <div className={`${css.tabLabel} ${setActiveClass(tab.name)}`}>{tab.name}</div>
          </li>
        ))}
      </ul>
      <div className={css.tabContent}>{tab.content}</div>
    </>
  );
};

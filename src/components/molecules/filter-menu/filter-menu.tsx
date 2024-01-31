import { useState } from 'react';

import css from './filter-menu.module.scss';
import { FilterMenuProps } from './filter-menu.types';

export const FilterMenu = ({ list, selectedValue, onGetValue }: FilterMenuProps) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [selected, setSelected] = useState(selectedValue);

  const onClick = (value: string, type: 'modal' | 'dropdown') => {
    if (type === 'dropdown') {
      setToggleDropdown(true);
    }
    onGetValue(value);
    setSelected(value);
  };

  return (
    <div className={css.container}>
      {list.map((item) => (
        <div key={item.value} onClick={() => onClick(item.value, item.type)} className={`${css.item}`}>
          <div className={`${css.button} ${item.value === selected ? css.active : ''}`}>
            <span>{item.label}</span>
            {/* {
                                item.value === selectedValue
                                    ? <img src='/icons/arrow-down-white.svg' />
                                    : <img src='/icons/arrow-down-black.svg' />
                            } */}
          </div>

          {/* {
                            item.type === 'dropdown' ? toggleDropdown ?
                                <div className={css.menuList}>
                                    {
                                        item.subMenu?.map((menu, index) =>
                                            <div key={index} className={css.menuItem}>
                                                {menu.label}
                                            </div>)
                                    }

                                </div> : false
                                : false
                        } */}
        </div>
      ))}
    </div>
  );
};

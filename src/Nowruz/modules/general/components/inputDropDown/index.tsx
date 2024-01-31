import { useState } from 'react';
import { Icon } from 'src/Nowruz/general/Icon';

import { CustomInput } from './customInput';
import css from './inputDropDown.module.scss';
import { InputDropDownProps } from './inputDropDown.types';

export const InputDropDown: React.FC<InputDropDownProps> = (props) => {
  const { label, hint, items, selected, setSelected } = props;
  const [openMenu, setOpenMenu] = useState(false);
  const [menuItems, setMenuItems] = useState(items);
  const handleSelect = (value: string) => {
    const item = items.find((i) => i.value === value);
    setSelected(item!);
  };
  return (
    <>
      <div className={css.container}>
        <label className={css.label}>{label}</label>

        <CustomInput
          setOpenMenu={setOpenMenu}
          openMenu={openMenu}
          menuItems={items}
          setMenuItems={setMenuItems}
          {...props}
        />

        {!openMenu ? (
          <div className={css.hint}>{hint}</div>
        ) : (
          <div className={`${css.menu} shadow-Shadows/shadow-lg`}>
            {menuItems.map((i) => (
              <div
                key={i.value}
                className={`${css.menuItem} ${i.value === selected?.value ? css.menuItemSelected : ''}`}
                onClick={() => handleSelect(i.value)}
              >
                {i.avatar}
                <span className={css.menuItemTitle}>{i.label}</span>
                <span className={css.menuItemSubTitle}>{i.subtitle}</span>
                {i.value === selected?.value && (
                  <div className="mr-0 ml-auto bg-white">
                    <Icon name="check" fontSize={20} color="black" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

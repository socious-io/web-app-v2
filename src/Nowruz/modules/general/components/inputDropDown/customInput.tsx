import React, { useEffect, useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './inputDropDown.module.scss';
import { CustomInputProps } from './inputDropDown.types';

export const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { placeHolderIcon, placeHolderText, selected, setSelected, setOpenMenu, openMenu, menuItems, setMenuItems } =
    props;
  const [text, setText] = useState(selected?.label);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value || '';
    setText(term);
    const filtered = menuItems.filter((i) => i.label.toLowerCase().includes(term.toLowerCase()));
    setMenuItems(filtered);
    setSelected(undefined);
    setOpenMenu(true);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const filtered = menuItems.filter((i) => i.label.toLowerCase().includes(text || ''));
      const item = filtered[0];
      if (item) setSelected(item);
    }
  };

  useEffect(() => {
    setText(selected?.label);
  }, [selected]);

  return (
    <div className={css.inputContainer} onClick={() => setOpenMenu(!openMenu)}>
      {selected ? selected.avatar : placeHolderIcon}
      <input
        className={css.customInput}
        placeholder={placeHolderText}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <span className={css.menuItemSubTitle}>{selected?.subtitle}</span>
      <div className="mr-0 ml-auto">
        <Icon name="chevron-down" fontSize={20} color={variables.color_grey_500} />
      </div>
    </div>
  );
};

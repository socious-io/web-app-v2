import React, { ChangeEvent, useEffect, useRef } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './search-input.module.scss';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onChange, value, onEnter, open, onEscape }) => {
  const handleOnEnter = (e: ChangeEvent<unknown>) => {
    if ('key' in e && e.key === 'Escape') {
      onEscape?.();
    }
    if ('key' in e && e.key === 'Enter') {
      onEnter?.();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (open && inputRef.current) {
        inputRef.current.focus();
      }
    }, 200);
  }, [open]);

  return (
    <div className={css.container}>
      <div className="flex flex-grow">
        <Icon name="search-lg" color={variables.color_grey_500} fontSize={20} />
        <input
          id="search-modal"
          value={value}
          type="text"
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={css.input}
          onKeyDown={handleOnEnter}
          ref={inputRef}
          autoFocus
          autoComplete="none"
        />
      </div>
      {/* <div className={css.commandBox}>⌘/</div> */}
    </div>
  );
};

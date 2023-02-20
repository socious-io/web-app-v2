import { ChangeEvent } from 'react';
import css from './search.module.scss';
import { SearchProps } from './search.types';

export const Search = (props: SearchProps): JSX.Element => {
  const { value, defaultValue, onValueChange, onChange, placeholder, ...rest } = props;

  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e);
    onValueChange?.(e.target.value);
  }

  const setValueProps = () => {
    const obj = {};
    if (defaultValue !== undefined) {
      Object.assign(obj, { defaultValue });
    }
    if (value !== undefined) {
      Object.assign(obj, { value });
    }
    return obj;
  };

  return (
    <div style={rest} className={css.container}>
      <div className={css.icon}>
        <img src="/icons/search.svg" />
      </div>
      <input
        placeholder={placeholder}
        type="search"
        onChange={onInputChange}
        {...setValueProps()}
        className={css.input}
      />
    </div>
  );
};

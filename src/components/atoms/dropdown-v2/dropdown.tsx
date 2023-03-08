import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { printWhen } from '../../../core/utils';
import css from './dropdown.module.scss';
import { DropdownItem, DropdownProps } from './dropdown.types';

const submenuHeightREM = 2.75;

export const Dropdown = (props: DropdownProps): JSX.Element => {
  const { size = 5 } = props;
  const ref = useRef<HTMLInputElement>(null);

  const [filteredList, setFilteredList] = useState(props.list);
  const [visibility, setSubMenuVisibility] = useState(false);

  useEffect(() => {
    const obj = props.list.find((item) => item.value === props.value);
    if (obj) {
      ref!.current!.value = obj.label;
    }
  }, []);

  useEffect(() => {
    setFilteredList(props.list);
  }, [props.list]);

  function onSearch(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const newFilteredList = props.list.filter((option) => option.label.toLowerCase().includes(value.toLocaleLowerCase()));
    setFilteredList(newFilteredList);
  }

  function onOptionClick(option: DropdownItem) {
    return () => {
      props.onValueChange?.(option);
      props.name && props.register?.bind(props.name).onChange(option.value);
      setSubMenuVisibility(false);
      /** @why "!" is safe here as ref is available on onClick event  */
      ref!.current!.value = option.label;
    };
  }

  function setOptionJSXClasses(visibility: boolean) {
    return visibility ? `${css.options} ${css.active}` : css.options;
  }

  function toggleVisibility() {
    setSubMenuVisibility((prev) => !prev);
  }

  function arrowStyle(visible: boolean) {
    return visible ? { transform: 'rotate(180deg)' } : { transform: 'rotate(0deg)' };
  }

  return (
    <div className={css.container}>
      {printWhen(<div className={css.label}>{props.label}</div>, !!props.label)}
      <div onFocus={() => setSubMenuVisibility(true)} className={css.inputContainer}>
        <input placeholder={props.placeholder} onChange={onSearch} ref={ref} className={css.input} />
        <div onClick={toggleVisibility} className={css.arrowContainer}>
          <img className={css.arrow} style={arrowStyle(visibility)} src="/icons/arrow-down-black.svg" />
        </div>
      </div>
      <div className={setOptionJSXClasses(visibility)} style={{ maxHeight: submenuHeightREM * size + 'rem' }}>
        {filteredList.map((option) => (
          <div key={option.value} onClick={onOptionClick(option)} className={css.option}>
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

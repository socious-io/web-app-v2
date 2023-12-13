import React, { useRef } from 'react';
import Select, { type DropdownIndicatorProps, components } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './search-dropdown.module.scss';
import { SelectProps } from './search-dropdown.types';
//TODO: Multi select chips not implemented
const CustomControl = ({ hasValue, icon, children, ...props }) => {
  return (
    <components.Control {...props} className={css.input}>
      {<Icon className={css.startIcon} name={icon} fontSize={20} color="#667085" />}
      {children}
    </components.Control>
  );
};
const CustomOption = ({ value, ...props }) => {
  const { innerProps, label, data, ...rest } = props;
  const selected = value.label === label;
  return (
    <div className="px-1.5">
      <div {...innerProps} className={`${css.option} ${selected ? `${css.selecetdOption}` : ''}`}>
        {selected && <Icon name="check" fontSize={20} color="#667085" />}
        <div className="ml-0 mr-auto flex gap-2">
          <span style={{ marginRight: '8px' }}>{data.icon}</span>
          {label}
        </div>
      </div>
    </div>
  );
};
const CustomSingleValue = ({ children, data, ...props }) => {
  return (
    <components.SingleValue {...props}>
      <div className="flex">
        {children}
        {data.description && <div className={css.description}>{data.description}</div>}
      </div>
    </components.SingleValue>
  );
};
export const SearchDropdown: React.FC<SelectProps> = ({
  isAsync,
  hasDropdownIcon = true,
  options,
  className,
  label,
  icon,
  errors,
  id,

  ...props
}) => {
  const selectedVal = props.value;
  const selectRef = useRef(null);
  const handleLabelClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };
  return (
    <div className={`${css.container} ${className}`}>
      <div className={css.labelContainer}>
        <label htmlFor={id} className={css.label} onClick={handleLabelClick} aria-describedby={id}>
          {label}
        </label>
      </div>
      {isAsync ? (
        <AsyncSelect
          id={id}
          ref={selectRef}
          options={options}
          noOptionsMessage={() => null}
          components={{
            Option: (props) => <CustomOption {...props} value={selectedVal} />,
            Control: (props) => <CustomControl {...props} icon={icon} />,
            DropdownIndicator: () => (
              <div className={css.dropdown}>
                {hasDropdownIcon && <Icon name="chevron-down" fontSize={20} color="#667085" />}
              </div>
            ),
            SingleValue: CustomSingleValue,
          }}
          styles={{
            singleValue: (provided, state) => ({
              ...provided,
              color: '#101828',
              fontSize: '16px',
              fontWeight: 500,
            }),

            control: (provided: any, state: any) => ({
              ...provided,
              '&:hover': '',
              border: state.isFocused ? '1px solid #99B7B5' : '1px solid #D0D5DD',
              boxShadow: state.isFocused ? ' 0px 0px 0px 4px #E6EDED;' : null,
              borderRadius: '8px',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
          {...props}
        />
      ) : (
        <Select
          id={id}
          ref={selectRef}
          options={options}
          noOptionsMessage={() => null}
          components={{
            Option: (props) => <CustomOption {...props} value={selectedVal} />,
            Control: (props) => <CustomControl {...props} icon={icon} />,
            DropdownIndicator: () => (
              <div className={css.dropdown}>
                {hasDropdownIcon && <Icon name="chevron-down" fontSize={20} color="#667085" />}
              </div>
            ),
            SingleValue: CustomSingleValue,
          }}
          styles={{
            singleValue: (provided, state) => ({
              ...provided,
              color: '#101828',
              fontSize: '16px',
              fontWeight: 500,
            }),

            control: (provided: any, state: any) => ({
              ...provided,
              '&:hover': '',
              border: state.isFocused ? '1px solid #99B7B5' : '1px solid #D0D5DD',
              boxShadow: state.isFocused ? ' 0px 0px 0px 4px #E6EDED;' : null,
              borderRadius: '8px',
            }),
            indicatorSeparator: () => ({ display: 'none' }),
          }}
          {...props}
        />
      )}
      {errors &&
        errors.map((e, index) => (
          <p key={index} className={`${css.errorMsg} ${css.msg}`}>
            {e}
          </p>
        ))}
    </div>
  );
};

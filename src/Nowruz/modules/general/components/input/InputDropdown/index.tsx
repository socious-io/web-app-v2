import React from 'react';
import Select, { components } from 'react-select';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './input-dropdown.module.scss';
import { InputDropdownProps } from './InputDropdown.types';
export const InputDropdown: React.FC<InputDropdownProps> = ({
  isAsync,
  hasDropdownIcon = true,
  options,
  className,
  label,
  icon,
  errors,
  id,
  minWidth = '',
  ...props
}) => {
  const CustomControl = ({ hasValue, icon, children, ...props }) => {
    console.log(props.selectProps?.value?.icon);
    return (
      <components.Control {...props}>
        {<Icon className={css.startIcon} name={icon} fontSize={20} color="#667085" />}
        {children}
      </components.Control>
    );
  };
  const CustomOption = ({ value, ...props }) => {
    const { innerProps, label, data, ...rest } = props;
    const selected = value && value.label ? value.label === label : false;
    return (
      <div {...innerProps} className={`${css.option} ${selected ? `${css.selecetdOption}` : ''}`}>
        {selected && <Icon name="check" fontSize={20} color="#667085" />}
        <span>{data.icon}</span>
        {label}
      </div>
    );
  };
  const CustomSingleValue = ({ children, data, ...props }) => {
    return (
      <components.SingleValue {...props}>
        <div className="flex ">
          {children}
          {data.description && <div className={css.description}>{data.description}</div>}
        </div>
      </components.SingleValue>
    );
  };
  const selectedVal = props.value;

  return (
    <Select
      options={options}
      noOptionsMessage={() => null}
      className={css.container}
      components={{
        Option: (props) => <CustomOption {...props} value={selectedVal} />,
        Control: (props) => <CustomControl {...props} icon={icon} />,
        DropdownIndicator: () => (
          <div className={css.dropdown}>
            <Icon name="chevron-down" fontSize={20} color="#667085" />
          </div>
        ),
        SingleValue: CustomSingleValue,
      }}
      styles={{
        singleValue: (provided, state) => ({
          ...provided,
          color: '#101828',
          fontSize: '16px',
          width: 'auto',
          fontWeight: 500,
        }),

        control: (provided: any, state: any) => ({
          ...provided,
          padding: '0',
          '&:hover': '',
          minWidth,
          border: 'none',
          boxShadow: 'none',
        }),
        indicatorSeparator: () => ({ display: 'none' }),
      }}
      {...props}
    />
  );
};

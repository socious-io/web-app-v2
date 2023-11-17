import Select, { StylesConfig } from 'react-select';

import { ColourOption, colourOptions } from '../data';
const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const colourStyles: StylesConfig<ColourOption> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = 'blue';
    return {
      ...styles,
      //   backgroundColor: isDisabled ? undefined : isSelected ? data.color : isFocused ? color : undefined,
      //   color: isDisabled ? '#ccc' : isSelected ?  'white' ? 'white' : 'black',
      //   cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        // backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

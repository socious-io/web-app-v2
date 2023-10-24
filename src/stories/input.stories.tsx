import { Input } from 'src/Nowruz/general/input/input';

export default { component: Input };
export const Normal = {
  args: {
    id: 'input-1',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: true,
    placeHolder: 'Placeholder',
  },
};

export const Error = {
  args: {
    id: 'input-2',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: true,
    placeHolder: 'Placeholder',
    errors: ['Error message 1', 'Error message 2'],
    isValid: false,
  },
};

export const Prefix = {
  args: {
    id: 'input-3',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: true,
    placeHolder: 'Placeholder',
    prefix: 'https://',
  },
};

export const Success = {
  args: {
    id: 'input-4',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: true,
    placeHolder: 'Placeholder',
    isValid: true,
    validMessage: 'field value is valid',
  },
};

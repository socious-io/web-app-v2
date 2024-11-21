import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';

const options = [
  { value: 'A', label: 'USDT', icon: <Icon name="star-filled" fontSize={20} className="text-Warning-300" /> },
  { value: 'B', label: 'BTC', icon: <Icon name="star-filled" fontSize={20} className="text-Warning-300" /> },
  { value: 'C', label: 'LGBT', icon: <Icon name="star-filled" fontSize={20} className="text-Warning-300" /> },
];

export default { title: 'General/Input', component: Input };
export const Normal = {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-12826&mode=design&t=qVheijfSIbPaOZ5X-0',
    },
  },
  args: {
    id: 'input-1',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: true,
    placeholder: 'Placeholder',
  },
};
export const MultiLine = {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-12826&mode=design&t=qVheijfSIbPaOZ5X-0',
    },
  },
  args: {
    id: 'input-5',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: true,
    placeholder: 'Placeholder',
    multiline: true,
    maxRows: 3,
    customHeight: '150PX',
  },
};
export const Error = {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-12826&mode=design&t=qVheijfSIbPaOZ5X-0',
    },
  },
  args: {
    id: 'input-2',
    name: 'inputName',
    label: 'Input Label',
    required: true,
    placeHolder: 'Placeholder',
    errors: ['Error message 1', 'Error message 2'],
    isValid: false,
    type: 'text',
    placeholder: 'Placeholder',
  },
};

export const Prefix = {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-12826&mode=design&t=qVheijfSIbPaOZ5X-0',
    },
  },
  args: {
    id: 'input-3',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: false,
    prefix: 'https://',
    placeholder: 'Placeholder',
  },
};

export const Success = {
  parameters: {
    design: {
      type: 'figspec',
      url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-12826&mode=design&t=qVheijfSIbPaOZ5X-0',
    },
  },
  args: {
    id: 'input-4',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: true,
    placeholder: 'Placeholder',
    isValid: true,
    validMessage: 'field value is valid',
  },
};
export const DropDown = {
  args: {
    id: 'input-3',
    name: 'inputName',
    type: 'text',
    label: 'Input Label',
    required: false,
    prefix: 'https://',
    placeholder: 'Placeholder',
    prefixDropdown: { options, placeholder: '$$$' },
  },
};

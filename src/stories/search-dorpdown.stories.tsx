import React from 'react';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

const companySizeOptions = [
  { value: 'A', label: 'Self-employed' },
  { value: 'B', label: '1-10 employees' },
  { value: 'C', label: '11-50 employees' },
  { value: 'D', label: '51-200 employees' },
  { value: 'E', label: '201-500 employees' },
  { value: 'F', label: '501-1000 employees' },
  { value: 'G', label: '1001-5000 employees' },
  { value: 'H', label: '5001-10,000 employees' },
  { value: 'I', label: '10,001+ employees' },
];
export default {
  title: 'General/SearchDropdown',
  component: SearchDropdown,
};

const Template = (args) => <SearchDropdown {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'City*',
  className: 'mb-5',
  placeholder: 'Select a company size',
  options: companySizeOptions,
  isSearchable: false,
  icon: 'search-lg',
};

Default.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-6056&mode=design&t=HPrsfldFRA5rFuj1-0',
  },
};

import React from 'react';
import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

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
  options: ORGANIZATION_SIZE,
  isSearchable: false,
  icon: 'search-lg',
};

Default.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-6056&mode=design&t=HPrsfldFRA5rFuj1-0',
  },
};

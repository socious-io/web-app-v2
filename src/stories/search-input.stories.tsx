import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SearchInput } from 'src/Nowruz/modules/Search/components/SearchInput';
import { SearchInputProps } from 'src/Nowruz/modules/Search/components/SearchInput/SearchInput.types';
export default {
  title: 'General/SearchInput',
  component: SearchInput,
} as Meta;

const Template: Story<SearchInputProps> = (args) => <SearchInput {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  onChange: (e) => console.log(e.target.value),
  placeholder: 'Search jobs, people, organizations',
};

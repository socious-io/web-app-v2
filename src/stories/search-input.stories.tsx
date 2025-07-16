import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { SearchInput } from 'src/modules/Search/components/SearchInput';
import { SearchInputProps } from 'src/modules/Search/components/SearchInput/SearchInput.types';
export default {
  title: 'General/SearchInput',
  component: SearchInput,
} as Meta;

const Template: StoryFn<SearchInputProps> = args => <SearchInput {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  onChange: e => console.log(e),
  placeholder: 'Search jobs, people, organizations',
};

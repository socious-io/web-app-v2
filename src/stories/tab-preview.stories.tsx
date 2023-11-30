import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { TabPreview } from 'src/Nowruz/modules/search/components/TabPreview';
export default {
  title: 'Search/TabPreview',
  component: TabPreview,
} as const;
const tabs = [
  { label: 'Jobs', value: 'Jobs' },
  { label: 'Organization', value: 'Organization' },
  { label: 'Poeple', value: 'Poeple' },
];
const Template: StoryFn = (args) => {
  return <TabPreview tabs={tabs} onSelect={() => console.log()} />;
};

export const Default = Template.bind({});
Default.args = {};

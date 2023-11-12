import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { LeftNavBar } from 'src/Nowruz/modules/layout/components/navBar/linksContainer/linksContainer';

export default {
  title: 'Layout/LeftNavBar',
  component: LeftNavBar,
} as const;

const Template: StoryFn = (args) => {
  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: 'pink' }}>
      <LeftNavBar {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

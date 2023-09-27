import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SendBox } from '../components/molecules/send-box/send-box';

export default {
  title: 'MOLECULES/SendBox',
  component: SendBox,
} as ComponentMeta<typeof SendBox>;

const Template: ComponentStory<typeof SendBox> = (args) => <SendBox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  onValueChange: console.log,
  onSend: console.log,
  img: '',
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Message } from '../design-system/atoms/message/message';

export default {
  title: 'MOLECULES/Message',
  component: Message,
} as ComponentMeta<typeof Message>;

const Template: ComponentStory<typeof Message> = (args) => <Message {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  id: '23234-234234',
  type: 'receiver',
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde pariatur nemo sed. Quia ratione recusandae sit fugiat rem, esse beatae dolorum. Vitae accusamus ipsa quibusdam vel ad blanditiis ratione ea.',
  img: '',
};

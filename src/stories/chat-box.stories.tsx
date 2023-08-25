import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChatBox } from '@atoms/chat-box/chat-box';

export default {
  title: 'ATOM/ChatBox',
  component: ChatBox,
} as ComponentMeta<typeof ChatBox>;

const Template: ComponentStory<typeof ChatBox> = (args) => <ChatBox {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: 'receiver',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh aliquet nullam odio maecenas semper. Dui felis suspendisse nunc, in vel enim nunc adipiscing donec. Pellentesque a magna venenatis ut ut semper dictum sit sem. Suspendisse lacus, pulvinar elit ipsum fermentum. Ipsum, orci, faucibus nibh et commodo et, dignissim erat. Adipiscing fusce et fames aliquam condimentum. ',
};

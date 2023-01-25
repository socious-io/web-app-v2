import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChatList } from '../design-system/organisms/chat-list/chat-list';
import { ChatListProps } from '../design-system/organisms/chat-list/chat-list.types';

export default {
  title: 'ORGANISM/ChatList',
  component: ChatList,
} as ComponentMeta<typeof ChatList>;

const Template: ComponentStory<typeof ChatList> = (args) => <ChatList {...args} />;

export const Primary = Template.bind({});

const DATA: ChatListProps['list'] = [
  {
    img: '',
    type: 'sender',
    text: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Aut numquam illo laborum eius inventore et, eligendi fuga suscipit nisi fugit voluptates, praesentium voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
  {
    img: '',
    type: 'receiver',
    text: ' voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
  {
    img: '',
    type: 'sender',
    text: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Aut numquam illo laborum eius inventore et, eligendi fuga suscipit nisi fugit voluptates, praesentium voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
  {
    img: '',
    type: 'receiver',
    text: ' voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
];

Primary.args = {
  list: DATA,
};

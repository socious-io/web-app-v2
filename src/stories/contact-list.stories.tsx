import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ContactList } from '../design-system/organisms/contact-list/contact-list';
import { ContactListProps } from '../design-system/organisms/contact-list/contact-list.types';

export default {
  title: 'ORGANISM/ContactList',
  component: ContactList,
} as ComponentMeta<typeof ContactList>;

const Template: ComponentStory<typeof ContactList> = (args) => <ContactList {...args} />;

export const Primary = Template.bind({});

const DATA: ContactListProps['list'] = [
  {
    id: '1',
    name: 'Sajad',
    text: 'Yeah',
    img: '',
    date: '2 min ago',
    date2: '5 min ago',
    badge: '2',
  },
  {
    id: '2',
    name: 'Sajad',
    text: 'Great!',
    img: '',
    date: '2 min ago',
    date2: '5 min ago',
    badge: '2',
  },
  {
    id: '3',
    name: 'Sajad',
    text: 'I"m fine',
    img: '',
    date: '2 min ago',
    date2: '5 min ago',
    badge: '2',
  },
  {
    id: '4',
    name: 'Sara',
    text: 'How are you?',
    img: '',
    date: '2 min ago',
    date2: '5 min ago',
    badge: '2',
  },
];

Primary.args = {
  list: DATA,
  onSearch: console.log,
};

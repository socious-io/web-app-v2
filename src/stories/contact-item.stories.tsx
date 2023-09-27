import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ContactItem } from '../components/molecules/contact-item/contact-item';

export default {
  title: 'MOLECULES/ContactItem',
  component: ContactItem,
} as ComponentMeta<typeof ContactItem>;

const Template: ComponentStory<typeof ContactItem> = (args) => <ContactItem {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  name: 'Sajad',
  text: 'Hello, How are you?',
  img: '',
  date: '2 months ago',
  date2: '1 minutes ago',
  badge: '2',
};

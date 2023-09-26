import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ProfileView } from '../components/molecules/profile-view/profile-view';

export default {
  title: 'MOLECULES/ProfileView',
  component: ProfileView,
} as ComponentMeta<typeof ProfileView>;

const Template: ComponentStory<typeof ProfileView> = (args) => <ProfileView {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  type: 'organization',
  name: 'Ocean Protection',
  location: 'Helsinki, Finland',
};

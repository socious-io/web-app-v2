import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Header} from '@atoms/header (archive)/header';

export default {
  title: 'ATOM/Header (archive)',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <Header {...args} />;

export const Primary = Template.bind({});

Primary.args = {onBackBtnClick: console.log};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Divider } from '../design-system/templates/divider/divider';

export default {
  title: 'TEMPLATE/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <>
    <Divider {...args} />
    <Divider {...args} />
    <Divider {...args} />
    <Divider {...args} />
  </>
);

export const Primary = Template.bind({});

Primary.args = {
  title: 'TITLE',
  divider: 'line',
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur quibusdam laboriosam possimus laborum ratione quas dolorum voluptatibus obcaecati dolorem provident eius iusto',
};

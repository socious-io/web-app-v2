import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Textarea } from '../design-system/atoms/textarea/textarea';

export default {
  title: 'ATOM/Textarea',
  component: Textarea,
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => (
  <Textarea {...args} />
);

export const Primary = Template.bind({});

Primary.args = {
  label: 'label',
  title: 'TITLE',
  onValueChange: console.log,
  variant: 'outline'
};

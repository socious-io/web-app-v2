import { ComponentMeta, ComponentStory } from '@storybook/react';
import { RadioGroup } from '../design-system/molecules/radio-group/radio-group';

export default {
  title: 'MOLECULES/RadioGroup',
  component: RadioGroup,
} as ComponentMeta<typeof RadioGroup>;

const Template: ComponentStory<typeof RadioGroup> = (args) => <RadioGroup {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  label: 'I am a Label',
  name: 'name',
  value: 'value 1',
  list: [
    { label: 'label 1', value: 'value 1' },
    { label: 'label 2', value: 'value 2' },
    { label: 'label 3', value: 'value 3' },
  ],
  onChange: console.log,
};

import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Card } from '../design-system/atoms/card/card';

export default {
  title: 'ATOM/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  children:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique facere rerum nisi exercitationem numquam temporibus architecto. Ullam obcaecati nihil quo iusto adipisci omnis qui cumque totam quod, magni dignissimos recusandae.',
};

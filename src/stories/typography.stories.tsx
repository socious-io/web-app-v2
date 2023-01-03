import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Typography} from '../design-system/atoms/typography/typography';

export default {
  title: 'ATOM/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

const Template: ComponentStory<typeof Typography> = (args) => (
  <Typography {...args}>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum labore, unde
    fugiat, suscipit officiis, eaque ex fugit rem quaerat enim sint omnis
    reprehenderit odio. Eaque nisi aut possimus accusamus. Molestias.
  </Typography>
);

export const Primary = Template.bind({});

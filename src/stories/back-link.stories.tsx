import { Meta, Story } from '@storybook/react';
import React from 'react';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { BackLinkProps } from 'src/Nowruz/modules/general/components/BackLink/back-link.types';

import { withRouter } from '.storybook/withRouter';
export default {
  title: 'General/BackLink',
  component: BackLink,
  decorators: [withRouter],
} as Meta;

const Template: Story<BackLinkProps> = (args: BackLinkProps) => <BackLink {...args} />;

export const Preview = Template.bind({});
Preview.args = {
  title: 'Jobs',
};
Preview.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=1-1190&mode=design&t=mtH2nhnFP8TKzTWZ-4',
  },
};

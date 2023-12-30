import { StoryFn } from '@storybook/react';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';

export default {
  title: 'General/Pagination',
  component: Pagination,
} as const;

const Template: StoryFn = (args) => {
  return <Pagination />;
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/sToYihTwJSFg3pLowAgKDv/DS-3.1-Web-App-Components?type=design&node-id=274-134931&mode=design&t=oUiyobSOmyelwSVn-0',
  },
};

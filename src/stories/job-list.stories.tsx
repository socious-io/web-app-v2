import { ComponentMeta, ComponentStory } from '@storybook/react';

import { JobList } from '../components/organisms/job-list/job-list';

export default {
  title: 'ORGANISM/JobList',
  component: JobList,
} as ComponentMeta<typeof JobList>;

const Template: ComponentStory<typeof JobList> = (args) => <JobList {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  data: [],
};

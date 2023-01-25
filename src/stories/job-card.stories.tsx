import { ComponentMeta, ComponentStory } from '@storybook/react';
import { JobCard } from '../design-system/molecules/job-card/job-card';

export default {
  title: 'MOLECULES/JobCard',
  component: JobCard,
} as ComponentMeta<typeof JobCard>;

const Template: ComponentStory<typeof JobCard> = (args) => <JobCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  id: '1',
  title: 'Product Designer (Paid - Fixed)',
  body: '0 applicant, 0 hired',
  date: ' string',
};

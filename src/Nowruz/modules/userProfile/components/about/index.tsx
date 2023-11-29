import { Divider } from '@mui/material';
import React from 'react';

import { AboutProps } from './about.types';
import { Experiences } from './experience';
import { Skills } from './skills';
import { Summary } from './summary';
import { MainInfo } from '../mainInfo';

export const About: React.FC<AboutProps> = (props) => {
  const { user, myProfile } = props;

  const testExperiences = [
    {
      id: '1',
      created_at: new Date(),
      org_id: 'org-1',
      title: 'Product Designer',
      description:
        'As a passionate and driven Product Designer at Ocean Protection, I played a pivotal role in crafting user-centered digital experiences aimed at raising awareness about the worlds oceans and promoting sustainable practices. Collaborating closely with cross-functional teams, I led the design and implementation of innovative solutions that engaged and educated users.',
      start_at: new Date(),
      end_at: null,
      org: {
        id: 'org-1',
        name: 'Ocean Protection',
        shortname: 'Ocean Protection',
      },
    },
    {
      id: '2',
      created_at: new Date(),
      org_id: 'org-2',
      title: 'Product Designer',
      description:
        'As a passionate and driven Product Designer at Ocean Protection, I played a pivotal role in crafting user-centered digital experiences aimed at raising awareness about the worlds oceans and promoting sustainable practices. Collaborating closely with cross-functional teams, I led the design and implementation of innovative solutions that engaged and educated users.',
      start_at: new Date(),
      end_at: null,
      org: {
        id: 'org-2',
        name: 'Socious',
        shortname: 'Socious',
      },
    },
    {
      id: '3',
      created_at: new Date(),
      org_id: 'org-3',
      title: 'Product Manager',
      description: '',
      start_at: new Date(),
      end_at: null,
      org: {
        id: 'org-3',
        name: 'test',
        shortname: 'test',
      },
    },
  ];
  return (
    <div className="flex flex-col gap-8">
      <div className="w-full block md:hidden">
        <MainInfo user={user} myProfile={myProfile} />
      </div>
      <Summary description={''} myProfile={myProfile} />
      <Divider />
      <Skills skills={user.skills} myProfile={myProfile} />
      <Divider />
      <Experiences items={testExperiences} myProfile={myProfile} />
    </div>
  );
};

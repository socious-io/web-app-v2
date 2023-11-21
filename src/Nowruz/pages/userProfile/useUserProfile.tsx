import { useLoaderData } from 'react-router-dom';
import { Badges } from 'src/constants/constants';
import { socialCausesToCategory } from 'src/core/adaptors';
import { MissionsRes, User } from 'src/core/api';
import { About } from 'src/Nowruz/modules/userProfile/components/about';

export const useUserProfile = () => {
  const resolver = useLoaderData() as { user: User; badges: Badges; missions: MissionsRes };
  const { user, badges, missions } = resolver;

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

  const tabs = [
    { label: 'About', content: <About summary="" experiences={testExperiences} skills={user.skills} /> },
    { label: 'Services', content: <div /> },
    { label: 'Reviews', content: <div /> },
  ];

  return { user, badges, missions, tabs };
};

import { Navigate, Route } from '@tanstack/react-location';
import { ChangePassword } from '../design-system/pages/change-password/change-password';
import { getJobDetail } from '../design-system/pages/job-detail/job-detail.services';
import { getJobList } from '../design-system/pages/jobs/jobs-cursor/jobs-cursor.services';
import { OrganizationCreateLayout } from '../design-system/pages/organization-create/organization-create-layout/organization-create-layout';
import { SignUpUserComplete } from '../design-system/pages/sign-up/sign-up-user-complete/sign-up-user-complete';
import { SignUpUserEmail } from '../design-system/pages/sign-up/sign-up-user-email/sign-up-user-email';
import { SignUpUserVerification } from '../design-system/pages/sign-up/sign-up-user-verification/sign-up-user-verification';
import { MenuCursor as RootCursorLayout } from '../design-system/templates/menu-cursor/menu-cursor';
import { MenuTouch as RootTouchLayout } from '../design-system/templates/menu-touch/menu-touch';
import { isTouchDevice } from './device-type-detector';

export const routes: Route[] = [
  {
    path: 'intro',
    element: () =>
      import('../design-system/pages/intro/intro').then((m) => <m.Intro />),
  },
  {
    path: 'sign-in',
    element: () =>
      import('../design-system/pages/sign-in/sign-in').then((m) => (
        <m.SignIn />
      )),
  },
  { path: 'change-password', element: <ChangePassword /> },
  {
    path: 'sign-up',
    children: [
      {
        path: '/user',
        children: [
          { path: '/email', element: <SignUpUserEmail /> },
          { path: '/verification', element: <SignUpUserVerification /> },
          { path: '/complete', element: <SignUpUserComplete /> },
        ],
      },
    ],
  },
  {
    path: 'organization',
    children: [
      {
        path: 'create',
        element: <OrganizationCreateLayout />,
        children: [
          {
            path: 'type',
            element: () =>
              import(
                '../design-system/pages/organization-create/organization-create-type/organization-create-type'
              ).then((m) => <m.OrganizationCreateType />),
          },
          {
            path: 'social-causes',
            element: () =>
              import(
                '../design-system/pages/organization-create/organization-create-social-causes/organization-create-social-causes'
              ).then((m) => <m.OrganizationCreateSocialCauses />),
          },
          {
            path: 'profile',
            element: () =>
              import(
                '../design-system/pages/organization-create/profile/profile'
              ).then((m) => <m.Profile />),
          },
        ],
      },
    ],
  },
  {
    path: '',
    element: isTouchDevice() ? <RootTouchLayout /> : <RootCursorLayout />,
    children: [
      {
        path: '/jobs/:id',
        loader: ({ params }) => getJobDetail(params.id),
        element: () =>
          import('../design-system/pages/job-detail/job-detail').then((m) => (
            <m.JobDetail />
          )),
      },
      {
        path: '/jobs',
        element: () =>
          import('../design-system/pages/jobs/jobs').then((m) => <m.Jobs />),
        loader: () => getJobList({ page: 1 }),
      },
      {
        element: <Navigate to="intro" />,
      },
    ],
  },
];

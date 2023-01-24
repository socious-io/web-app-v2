import { Navigate, Route } from '@tanstack/react-location';
import { ChangePassword } from '../design-system/pages/change-password/change-password';
import { getChatsSummery } from '../design-system/pages/chat/contact-list/contact-list.services';
import { getJobDetail } from '../design-system/pages/job-detail/job-detail.services';
import { getJobList } from '../design-system/pages/jobs/jobs-cursor/jobs-cursor.services';
import { SignUpUserComplete } from '../design-system/pages/sign-up/sign-up-user-complete/sign-up-user-complete';
import { SignUpUserEmail } from '../design-system/pages/sign-up/sign-up-user-email/sign-up-user-email';
import { SignUpUserVerification } from '../design-system/pages/sign-up/sign-up-user-verification/sign-up-user-verification';
import { MenuCursor as RootCursorLayout } from '../design-system/templates/menu-cursor/menu-cursor';
import { MenuTouch as RootTouchLayout } from '../design-system/templates/menu-touch/menu-touch';
import { isTouchDevice } from './device-type-detector';
import { getNotificationList } from '../design-system/pages/notifications/notifications.service';
import {
  getMessagesById,
  getParticipantsById,
} from '../design-system/pages/chat/message-detail/message-detail.services';
import { getIdentities } from './api';
import store from '../store/store';
import { setIdentityList } from '../store/reducers/identity.reducer';
import { getFollowings } from '../design-system/pages/chat/new-chat/new-chat.services';

export const routes: Route[] = [
  {
    path: '',
    loader: async () => {
      const resp = await getIdentities();
      store.dispatch(setIdentityList(resp));
      return resp;
    },
    children: [
      {
        path: 'intro',
        element: () => import('../design-system/pages/intro/intro').then((m) => <m.Intro />),
      },
      {
        path: 'sign-in',
        element: () => import('../design-system/pages/sign-in/sign-in').then((m) => <m.SignIn />),
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
            children: [
              {
                path: 'intro',
                element: () =>
                  import('../design-system/pages/organization-create/intro/intro').then((m) => (
                    <m.Intro />
                  )),
              },
              {
                path: 'type',
                element: () =>
                  import('../design-system/pages/organization-create/type/type').then((m) => (
                    <m.Type />
                  )),
              },
              {
                path: 'social-causes',
                element: () =>
                  import(
                    '../design-system/pages/organization-create/social-causes/social-causes'
                  ).then((m) => <m.SocialCauses />),
              },
              {
                path: 'profile',
                element: () =>
                  import('../design-system/pages/organization-create/profile/profile').then((m) => (
                    <m.Profile />
                  )),
              },
              {
                path: 'mission',
                element: () =>
                  import('../design-system/pages/organization-create/mission/mission').then((m) => (
                    <m.Mission />
                  )),
              },
              {
                path: 'culture',
                element: () =>
                  import('../design-system/pages/organization-create/culture/culture').then((m) => (
                    <m.Culture />
                  )),
              },
              {
                path: 'social-impact',
                element: () =>
                  import(
                    '../design-system/pages/organization-create/social-impact/social-impact'
                  ).then((m) => <m.SocialImpact />),
              },
              {
                path: 'succeed',
                element: () =>
                  import('../design-system/pages/organization-create/succeed/succeed').then((m) => (
                    <m.Succeed />
                  )),
              },
              {
                path: 'verified',
                element: () =>
                  import('../design-system/pages/organization-create/verified/verified').then(
                    (m) => <m.Verified />
                  ),
              },
            ],
          },
        ],
      },
      {
        path: '/chats',
        children: [
          {
            path: 'new',
            loader: () => getFollowings({ page: 1, name: '' }),
            element: () =>
              import('../design-system/pages/chat/new-chat/new-chat').then((m) => <m.NewChat />),
          },
          {
            path: 'contacts/:id',
            loader: async ({ params }) => {
              const requests = [
                getMessagesById({ id: params.id, page: 1 }),
                getParticipantsById(params.id),
              ];
              const [messages, participants] = await Promise.all(requests);
              return {
                messages,
                participants,
              };
            },
            element: () =>
              import('../design-system/pages/chat/message-detail/message-detail').then((m) => (
                <m.MessageDetail />
              )),
          },
          {
            path: 'contacts',
            loader: () => getChatsSummery({ page: 1, filter: '' }),
            element: () =>
              import('../design-system/pages/chat/contact-list/contact-list').then((m) => (
                <m.ContactList />
              )),
          },
        ],
      },
      {
        element: isTouchDevice() ? <RootTouchLayout /> : <RootCursorLayout />,
        children: [
          {
            path: '/jobs/:id',
            loader: ({ params }) => getJobDetail(params.id),
            element: () =>
              import('../design-system/pages/job-detail/job-detail').then((m) => <m.JobDetail />),
          },
          {
            path: '/jobs',
            element: () => import('../design-system/pages/jobs/jobs').then((m) => <m.Jobs />),
            loader: () => getJobList({ page: 1 }),
          },
          {
            path: 'notifications',
            element: () =>
              import('../design-system/pages/notifications/notifications').then((m) => (
                <m.Notifications />
              )),
            loader: () => getNotificationList({ page: 1 }),
          },
          {
            path: 'feed',
            element: () => import('../design-system/pages/feed/feed').then((m) => <m.Feed />),
          },
          {
            element: <Navigate to="intro" />,
          },
        ],
      },
    ],
  },
];

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
import {
  getMessagesById,
  getParticipantsById,
} from '../design-system/pages/chat/message-detail/message-detail.services';
import { getIdentities } from './api';
import store from '../store/store';
import { setIdentityList } from '../store/reducers/identity.reducer';
import { getFollowings } from '../design-system/pages/chat/new-chat/new-chat.services';
import {
  getActiveJobs,
  getDraftJobs,
} from '../design-system/pages/job-create/my-jobs/my-jobs.services';
import { getFeedList } from '../design-system/pages/feed/mobile/mobile.service';
import {
  getComments,
  getPostDetail,
} from '../design-system/pages/feed/post-detail/mobile/mobile.service';
import { getUserDetail } from '../design-system/pages/profile/profile.services';
import { UserType } from './types';
import { getJobCategories } from '../design-system/pages/job-create/info/info.services';
import { search } from '../design-system/pages/search/search.services';
import { getNotificationList } from '../design-system/pages/notifications/mobile/mobile.service';
import { getScreeningQuestions } from '../design-system/pages/job-apply/apply/apply.services';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from '../design-system/pages/job-apply/my-jobs/my-jobs.services';

export const routes: Route[] = [
  {
    path: '',
    loader: async () => {
      const resp = await getIdentities();
      console.log('identityId: ', resp.filter((item) => item.current)[0].id);
      store.dispatch(setIdentityList(resp));
      return resp;
    },
    children: [
      {
        path: 'intro',
        element: () => import('../design-system/pages/intro/intro').then((m) => <m.Intro />),
      },
      {
        path: 'forget-password',
        children: [
          {
            path: '/email',
            element: () =>
              import('../design-system/pages/forget-password/email/email').then((m) => <m.Email />),
          },
          {
            path: '/otp',
            element: () =>
              import('../design-system/pages/forget-password/otp/otp').then((m) => <m.Otp />),
          },
          {
            path: '/password',
            element: () =>
              import('../design-system/pages/forget-password/password/password').then((m) => (
                <m.Password />
              )),
          },
        ],
      },
      {
        path: 'delete-profile',
        children: [
          {
            path: '/delete',
            element: () =>
              import('../design-system/pages/delete-profile/delete/delete').then((m) => (
                <m.Delete />
              )),
          },
          {
            path: '/password',
            element: () =>
              import('../design-system/pages/delete-profile/password/password').then((m) => (
                <m.Password />
              )),
          },
          {
            path: '/confirm',
            element: () =>
              import('../design-system/pages/delete-profile/confirm/confirm').then((m) => (
                <m.Confirm />
              )),
          },
        ],
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
        path: 'profile/:userType/:id',
        loader: ({ params }) => {
          const userType = params.userType as UserType;
          return getUserDetail({ id: params.id, userType });
        },
        element: () => import('../design-system/pages/profile/profile').then((m) => <m.Profile />),
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
        path: '/jobs/created/:id',
        loader: async ({ params }) => {
          const requests = [
            getActiveJobs({ identityId: params.id, page: 1 }),
            getDraftJobs({ identityId: params.id, page: 1 }),
          ];
          const [activeJobs, draftJobs] = await Promise.all(requests);
          return {
            activeJobs,
            draftJobs,
          };
        },
        element: () =>
          import('../design-system/pages/job-create/my-jobs/my-jobs').then((m) => <m.MyJobs />),
      },
      {
        path: '/jobs/create',
        children: [
          {
            path: 'social-causes',
            element: () =>
              import('../design-system/pages/job-create/social-causes/social-causes').then((m) => (
                <m.SocialCauses />
              )),
          },
          {
            path: 'skills',
            element: () =>
              import('../design-system/pages/job-create/skills/skills').then((m) => <m.Skills />),
          },
          {
            path: 'info',
            loader: () => getJobCategories(),
            element: () =>
              import('../design-system/pages/job-create/info/info').then((m) => <m.Info />),
          },
        ],
      },
      {
        path: '/feeds/:id',
        loader: async ({ params }) => {
          const requests = [getPostDetail(params.id), getComments(params.id, 1)];
          const [post, comments] = await Promise.all(requests);
          return { post, comments };
        },
        element: () =>
          import('../design-system/pages/feed/post-detail/post-detail').then((m) => (
            <m.PostDetail />
          )),
      },
      {
        path: 'search',
        element: () => import('../design-system/pages/search/search').then((m) => <m.Search />),
        loader: (p) => {
          return search({ filter: {}, q: p.search.q as string, type: 'projects', page: 1 });
        },
      },
      {
        path: 'privacy-policy',
        element: () =>
          import('../design-system/pages/privacy-policy/privacy-policy').then((m) => (
            <m.PrivacyPolicy />
          )),
      },
      {
        path: '/jobs/:id/apply',
        loader: async ({ params }) => {
          const requests = [getJobDetail(params.id), getScreeningQuestions(params.id)];
          const [jobDetail, screeningQuestions] = await Promise.all(requests);
          return { jobDetail, screeningQuestions };
        },
        element: () =>
          import('../design-system/pages/job-apply/apply/apply').then((m) => <m.JobApply />),
      },
      {
        path: '/jobs/applied/:id',
        loader: async () => {
          const requests = [
            getPendingApplicants({ page: 1 }),
            getAwaitingReviewList({ page: 1 }),
            getDeclinedApplicants({ page: 1 }),
            getOnGoingList({ page: 1 }),
            getEndedList({ page: 1 }),
          ];
          const [
            pendingApplicants,
            awaitingApplicants,
            declinedApplicants,
            onGoingApplicants,
            endedApplicants,
          ] = await Promise.all(requests);
          return {
            pendingApplicants,
            awaitingApplicants,
            declinedApplicants,
            onGoingApplicants,
            endedApplicants,
          };
        },
        element: () =>
          import('../design-system/pages/job-apply/my-jobs/my-jobs').then((m) => <m.MyJobs />),
      },
      {
        path: '/jobs/:id/confirm',
        element: () =>
          import('../design-system/pages/job-apply/confirm/confirm').then((m) => <m.Confirm />),
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
            path: 'feeds',
            element: () => import('../design-system/pages/feed/feed').then((m) => <m.Feed />),
            loader: () => getFeedList({ page: 1 }),
          },
          {
            element: <Navigate to="intro" />,
          },
        ],
      },
    ],
  },
];

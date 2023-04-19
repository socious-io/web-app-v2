import { Navigate, Route } from '@tanstack/react-location';
import { ChangePassword } from '../../pages/change-password/change-password';
import { getChatsSummery } from '../../pages/chat/contact-list/contact-list.services';
import { getJobList } from '../../pages/jobs/jobs-cursor/jobs-cursor.services';
import { SignUpUserComplete } from '../../pages/sign-up/sign-up-user-complete/sign-up-user-complete';
import { SignUpUserEmail } from '../../pages/sign-up/sign-up-user-email/sign-up-user-email';
import { SignUpUserVerification } from '../../pages/sign-up/sign-up-user-verification/sign-up-user-verification';
import { MenuCursor as RootCursorLayout } from '../../components/templates/menu-cursor/menu-cursor';
import { MenuTouch as RootTouchLayout } from '../../components/templates/menu-touch/menu-touch';
import { isTouchDevice } from '../device-type-detector';
import { getMessagesById, getParticipantsById } from '../../pages/chat/message-detail/message-detail.services';
import { getFollowings } from '../../pages/chat/new-chat/new-chat.services';
import { getActiveJobs, getDraftJobs } from '../../pages/job-create/my-jobs/my-jobs.services';
import { getFeedList } from '../../pages/feed/mobile/mobile.service';
import { getComments, getPostDetail } from '../../pages/feed/post-detail/mobile/mobile.service';
import { getJobCategories } from '../../pages/job-create/info/info.services';
import { search } from '../../pages/search/search.services';
import { getNotificationList } from '../../pages/notifications/mobile/mobile.service';
import { getScreeningQuestions } from '../../pages/job-apply/apply/apply.services';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from '../../pages/job-apply/my-jobs/my-jobs.services';
import { getApplicantDetail, jobOfferRejectLoader } from '../../pages/job-offer-reject/job-offer-reject.services';
import { receivedOfferLoader } from '../../pages/offer-received/offer-received.services';
import { endpoint } from '../endpoints';
import { jobsPageLoader } from 'src/pages/jobs/jobs.loader';
import { Intro } from '../../pages/intro/intro';
import { profileUserPageLoader } from 'src/pages/profile-user/profile-user.loader';
import { AchievementsPageLoader } from 'src/pages/achievements/achievements.loader';
import { profileOrganizationPageLoader } from 'src/pages/profile-organization/profile-organization.loader';
import { getSettingsItems } from 'src/pages/notifications/settings/settings.service';

export const routes: Route[] = [
  {
    path: 'intro',
    element: () => import('../../pages/intro/intro').then((m) => <m.Intro />),
  },
  {
    path: 'sign-in',
    element: () => import('../../pages/sign-in/sign-in-container').then((m) => <m.SignInContainer />),
  },
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
    path: 'forget-password',
    children: [
      {
        path: '/email',
        element: () => import('../../pages/forget-password/email/email').then((m) => <m.Email />),
      },
      {
        path: '/otp',
        element: () => import('../../pages/forget-password/otp/otp').then((m) => <m.Otp />),
      },
      {
        path: '/password',
        element: () => import('../../pages/forget-password/password/password').then((m) => <m.Password />),
      },
    ],
  },
  {
    path: '',
    loader: jobsPageLoader,
    errorElement: <Intro />,
    children: [
      {
        path: 'delete-profile',
        children: [
          {
            path: '/delete',
            element: () => import('../../pages/delete-profile/delete/delete').then((m) => <m.Delete />),
          },
          {
            path: '/password',
            element: () => import('../../pages/delete-profile/password/password').then((m) => <m.Password />),
          },
          {
            path: '/confirm',
            element: () => import('../../pages/delete-profile/confirm/confirm').then((m) => <m.Confirm />),
          },
        ],
      },
      { path: 'change-password', element: <ChangePassword /> },
      {
        path: 'profile/users/:id',
        loader: profileUserPageLoader,
        children: [
          {
            path: 'view',
            element: () => import('../../pages/profile-user/profile-user').then((m) => <m.ProfileUser />),
          },
          {
            path: 'edit',
            element: () => import('../../pages/profile-user-edit/profile-user-edit').then((m) => <m.ProfileUserEdit />),
          },
        ],
      },
      {
        path: 'profile/organizations/:id',
        loader: profileOrganizationPageLoader,
        children: [
          {
            path: 'view',
            element: () =>
              import('../../pages/profile-organization/profile-organization').then((m) => <m.ProfileOrganization />),
          },
          {
            path: 'edit',
            element: () =>
              import('../../pages/profile-organization-edit/profile-organization-edit').then((m) => (
                <m.ProfileOrganizationEdit />
              )),
          },
        ],
      },
      {
        path: 'payment/:id',
        loader: ({ params }) => receivedOfferLoader(params),
        element: () => import('../../pages/payment/payment').then((m) => <m.Payment />),
      },
      {
        path: '/achievements',
        loader: AchievementsPageLoader,
        element: () => import('../../pages/achievements/achievements').then((m) => <m.Achievements />),
      },
      {
        path: 'organization',
        children: [
          {
            path: 'create',
            children: [
              {
                path: 'intro',
                element: () => import('../../pages/organization-create/intro/intro').then((m) => <m.Intro />),
              },
              {
                path: 'type',
                element: () => import('../../pages/organization-create/type/type').then((m) => <m.Type />),
              },
              {
                path: 'social-causes',
                element: () =>
                  import('../../pages/organization-create/social-causes/social-causes').then((m) => <m.SocialCauses />),
              },
              {
                path: 'profile',
                element: () => import('../../pages/organization-create/profile/profile').then((m) => <m.Profile />),
              },
              {
                path: 'mission',
                element: () => import('../../pages/organization-create/mission/mission').then((m) => <m.Mission />),
              },
              {
                path: 'culture',
                element: () => import('../../pages/organization-create/culture/culture').then((m) => <m.Culture />),
              },
              {
                path: 'social-impact',
                element: () =>
                  import('../../pages/organization-create/social-impact/social-impact').then((m) => <m.SocialImpact />),
              },
              {
                path: 'succeed',
                element: () => import('../../pages/organization-create/succeed/succeed').then((m) => <m.Succeed />),
              },
              {
                path: 'verified',
                element: () => import('../../pages/organization-create/verified/verified').then((m) => <m.Verified />),
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
            element: () => import('../../pages/chat/new-chat/new-chat').then((m) => <m.NewChat />),
          },
          {
            path: 'contacts/:id',
            loader: async ({ params }) => {
              const requests = [getMessagesById({ id: params.id, page: 1 }), getParticipantsById(params.id)];
              const [messages, participants] = await Promise.all(requests);
              return {
                messages,
                participants,
              };
            },
            element: () => import('../../pages/chat/message-detail/message-detail').then((m) => <m.MessageDetail />),
          },
          {
            path: 'contacts',
            loader: () => getChatsSummery({ page: 1, filter: '' }),
            element: () => import('../../pages/chat/contact-list/contact-list').then((m) => <m.ContactList />),
          },
        ],
      },
      {
        path: '/jobs/created/:id/overview',
        children: [
          {
            path: '/:applicantId/offer',
            loader: async ({ params }) => {
              const requests = [getApplicantDetail(params.applicantId)];
              const [applicantDetail] = await Promise.all(requests);
              return { applicantDetail };
            },
            element: () => import('../../pages/job-offer-reject/offer/offer').then((m) => <m.Offer />),
          },
          {
            path: '/:applicantId',
            loader: async ({ params }) => {
              const requests = [getScreeningQuestions(params.id), getApplicantDetail(params.applicantId)];
              const [screeningQuestions, applicantDetail] = await Promise.all(requests);
              return { applicantDetail, screeningQuestions };
            },
            element: () =>
              import('../../pages/job-offer-reject/applicant-detail/applicant-detail').then((m) => (
                <m.ApplicantDetail />
              )),
          },
          {
            loader: (params) => jobOfferRejectLoader(params),
            element: () => import('../../pages/job-offer-reject/job-offer-reject').then((m) => <m.JobOfferReject />),
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
          return { activeJobs, draftJobs };
        },
        element: () => import('../../pages/job-create/my-jobs/my-jobs').then((m) => <m.MyJobs />),
      },
      {
        path: '/jobs/create',
        children: [
          {
            path: 'social-causes',
            element: () => import('../../pages/job-create/social-causes/social-causes').then((m) => <m.SocialCauses />),
          },
          {
            path: 'skills',
            element: () => import('../../pages/job-create/skills/skills').then((m) => <m.Skills />),
          },
          {
            path: 'info',
            loader: () => getJobCategories(),
            element: () => import('../../pages/job-create/info/info').then((m) => <m.Info />),
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
        element: () => import('../../pages/feed/post-detail/post-detail').then((m) => <m.PostDetail />),
      },
      {
        path: 'search',
        element: () => import('../../pages/search/search').then((m) => <m.Search />),
        loader: (p) => {
          return search({ filter: {}, q: p.search.q as string, type: 'projects', page: 1 });
        },
      },
      {
        path: 'privacy-policy',
        element: () => import('../../pages/privacy-policy/privacy-policy').then((m) => <m.PrivacyPolicy />),
      },
      {
        path: 'terms-conditions',
        element: () => import('../../pages/terms-conditions/terms-conditions').then((m) => <m.TermsConditions />),
      },

      {
        path: '/jobs/:id/apply',
        loader: async ({ params }) => {
          const requests = [endpoint.get.projects.project_id(params.id), getScreeningQuestions(params.id)];
          const [jobDetail, screeningQuestions] = await Promise.all(requests);
          return { jobDetail, screeningQuestions };
        },
        element: () => import('../../pages/job-apply/apply/apply').then((m) => <m.JobApply />),
      },
      {
        path: '/jobs/received-offer/:id',
        loader: ({ params }) => receivedOfferLoader(params),
        element: () => import('../../pages/offer-received/offer-received').then((m) => <m.OfferReceived />),
      },
      {
        path: '/jobs/applied/complete-mission/:id',
        loader: async ({ params }) => {
          const mission = await endpoint.get.missions.mission_id(params.id);
          const offer = await endpoint.get.offers.offer_id(mission.offer_id);
          return { mission, offer };
        },
        element: () => import('../../pages/complete-mission/complete-mission').then((m) => <m.CompleteMission />),
      },
      {
        path: '/jobs/applied',
        loader: async () => {
          const requests = [
            getPendingApplicants({ page: 1 }),
            getAwaitingReviewList({ page: 1 }),
            getDeclinedApplicants({ page: 1 }),
            getOnGoingList({ page: 1 }),
            getEndedList({ page: 1 }),
          ];
          const [pendingApplicants, awaitingApplicants, declinedApplicants, onGoingApplicants, endedApplicants] =
            await Promise.all(requests);
          return {
            pendingApplicants,
            awaitingApplicants,
            declinedApplicants,
            onGoingApplicants,
            endedApplicants,
          };
        },
        children: [
          {
            path: ':id',
            element: () => import('../../pages/job-apply/my-jobs/my-jobs').then((m) => <m.MyJobs />),
          },
        ],
      },
      {
        path: '/jobs/:id/confirm',
        element: () => import('../../pages/job-apply/confirm/confirm').then((m) => <m.Confirm />),
      },
      {
        element: isTouchDevice() ? <RootTouchLayout /> : <RootCursorLayout />,
        children: [
          {
            path: '/jobs/:id',
            loader: ({ params }) => endpoint.get.projects.project_id(params.id),
            element: () => import('../../pages/job-detail/job-detail').then((m) => <m.JobDetail />),
          },
          {
            path: '/jobs',
            element: () => import('../../pages/jobs/jobs').then((m) => <m.Jobs />),
            loader: () => {
              return getJobList({ page: 1 });
            },
          },
          {
            path: 'notifications',
            children: [
              {
                path: '/settings',
                element: () => import('src/pages/notifications/settings/settings').then((m) => <m.Settings />),
                loader: () => getSettingsItems(),
              },
              {
                element: () => import('../../pages/notifications/notifications').then((m) => <m.Notifications />),
                loader: () => getNotificationList({ page: 1 }),
              },
            ],
          },

          {
            path: 'feeds',
            element: () => import('../../pages/feed/feed').then((m) => <m.Feed />),
            loader: () => getFeedList({ page: 1 }),
          },
          {
            element: <Navigate to="/jobs" />,
          },
        ],
      },
    ],
  },
];

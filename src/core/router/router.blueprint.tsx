import { RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';
import { MenuCursor as RootCursorLayout } from 'src/components/templates/menu-cursor/menu-cursor';
import { MenuTouch as RootTouchLayout } from 'src/components/templates/menu-touch/menu-touch';
import Layout from 'src/components/templates/refactored/layout/layout';
import { getMedia, job, getMission, getOffer } from 'src/core/api';
import {
  jobs,
  createChat,
  chatMessages,
  getChatParticipantsById,
  chats,
  getFollowings,
  notificationSettings,
  notifications,
  posts,
  getPost,
  postComments,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from 'src/pages/job-apply/my-jobs/my-jobs.services';
import { getJobCategories } from 'src/pages/job-create/info/info.services';
import { getActiveJobs, getArchivedJobs, getDraftJobs } from 'src/pages/job-create/my-jobs/my-jobs.services';
import {
  getApplicantDetail,
  getScreeningQuestions,
  jobOfferRejectLoader,
} from 'src/pages/job-offer-reject/job-offer-reject.services';
import { jobsPageLoader } from 'src/pages/jobs/jobs.loader';
import { receivedOfferLoader } from 'src/pages/offer-received/offer-received.services';
import store from 'src/store/store';
export const blueprint: RouteObject[] = [
  {
    path: '/',
    element: <DefaultRoute />,
  },
  {
    path: '/intro',
    async lazy() {
      const { Intro } = await import('../../pages/intro/intro');
      return {
        Component: Intro,
      };
    },
  },
  {
    path: '/sign-in',
    async lazy() {
      const { SignInContainer } = await import('../../pages/sign-in/sign-in-container');
      return {
        Component: SignInContainer,
      };
    },
  },
  {
    path: 'sign-up',
    children: [
      {
        path: 'user',
        children: [
          {
            path: 'email',
            async lazy() {
              const { SignUpUserEmailContainer } = await import(
                '../../pages/sign-up/sign-up-user-email/sign-up-user-email.container'
              );
              return {
                Component: SignUpUserEmailContainer,
              };
            },
          },
          {
            path: 'verification',
            async lazy() {
              const { SignUpUserVerificationContainer } = await import(
                '../../pages/sign-up/sign-up-user-verification/sign-up-user-verification.container'
              );
              return {
                Component: SignUpUserVerificationContainer,
              };
            },
          },
          {
            path: 'complete',
            async lazy() {
              const { SignUpUserCompleteContainer } = await import(
                '../../pages/sign-up/sign-up-user-complete/sign-up-user-complete.container'
              );
              return {
                Component: SignUpUserCompleteContainer,
              };
            },
          },
          {
            path: 'welcome',
            async lazy() {
              const { Welcome } = await import('../../pages/sign-up/welcome/welcome');
              return {
                Component: Welcome,
              };
            },
          },
          {
            path: 'onboarding',
            async lazy() {
              const { SignUpUserOnboarding } = await import(
                '../../pages/sign-up/sign-up-user-onboarding/sign-up-user-complete.container'
              );
              return {
                Component: SignUpUserOnboarding,
              };
            },
          },
          {
            path: 'allow-notification',
            async lazy() {
              const { AllowNotification } = await import('../../pages/sign-up/AllowNotification');
              return {
                Component: AllowNotification,
              };
            },
          },
        ],
      },
    ],
  },
  {
    path: 'forget-password',
    children: [
      {
        path: 'email',
        async lazy() {
          const { Email } = await import('../../pages/forget-password/email/email.container');
          return {
            Component: Email,
          };
        },
      },
      {
        path: 'otp',
        async lazy() {
          const { Otp } = await import('../../pages/forget-password/otp/otp.container');
          return {
            Component: Otp,
          };
        },
      },
      {
        path: 'password',
        async lazy() {
          const { Password } = await import('../../pages/forget-password/password/password.container');
          return {
            Component: Password,
          };
        },
      },
    ],
  },
  {
    element: <Layout />,
    loader: jobsPageLoader,
    path: '/jobs',
    children: [
      {
        path: '',
        loader: async () => {
          const data = await jobs({ page: 1 });
          return { data };
        },
        async lazy() {
          const { Jobs } = await import('../../pages/jobs');
          return {
            Component: Jobs,
          };
        },
      },
      {
        path: 'applied/complete-mission/:id',
        loader: async ({ params }) => {
          let media = { url: '' };
          const mission = await getMission(params.id);
          const offer = await getOffer(mission.offer_id);
          if (offer.applicant?.attachment) {
            media = await getMedia(offer.applicant.attachment);
          }
          return { mission, offer, media };
        },
        async lazy() {
          const { CompleteMission } = await import('../../pages/complete-mission/complete-mission.container');
          return {
            Component: CompleteMission,
          };
        },
      },
      {
        path: ':id',
        loader: async ({ params }) => {
          const requests = [job(params.id), getScreeningQuestions(params.id)];
          const [jobDetail, screeningQuestions] = await Promise.all(requests);
          return { jobDetail, screeningQuestions };
        },
        async lazy() {
          const { JobDetailContainer } = await import('../../pages/job-detail/job-detail.container');
          return { Component: JobDetailContainer };
        },
      },
      {
        path: ':id/apply',
        loader: async ({ params }) => {
          const requests = [job(params.id), getScreeningQuestions(params.id)];
          const [jobDetail, screeningQuestions] = await Promise.all(requests);
          return { jobDetail, screeningQuestions };
        },
        async lazy() {
          const { JobApply } = await import('../../pages/job-apply/apply/apply.container');
          return { Component: JobApply };
        },
      },

      {
        path: 'created/:id/overview/:applicantId/offer',
        loader: async ({ params }) => {
          const requests = [getApplicantDetail(params.applicantId)];
          const [applicantDetail] = await Promise.all(requests);
          return { applicantDetail };
        },
        async lazy() {
          const { Offer } = await import('../../pages/job-offer-reject/offer/offer.container');
          return { Component: Offer };
        },
      },
      {
        path: 'created/:id/overview/:applicantId',
        loader: async ({ params }) => {
          const requests = [getScreeningQuestions(params.id), getApplicantDetail(params.applicantId)];
          const [screeningQuestions, applicantDetail] = await Promise.all(requests);
          return { applicantDetail, screeningQuestions };
        },
        async lazy() {
          const { ApplicantDetail } = await import('../../pages/job-offer-reject/applicant-detail/applicant-detail');
          return { Component: ApplicantDetail };
        },
      },
      {
        path: 'created/:id/overview',
        loader: (params) => jobOfferRejectLoader(params),
        async lazy() {
          const { JobOfferReject } = await import('../../pages/job-offer-reject/job-offer-reject.container');
          return { Component: JobOfferReject };
        },
      },
      {
        path: 'applied/:id',
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
        async lazy() {
          const { MyJobs } = await import('../../pages/job-apply/my-jobs/my-jobs');
          return { Component: MyJobs };
        },
      },
      {
        path: 'created/:id',
        loader: async ({ params }) => {
          const requests = [
            getActiveJobs({ identityId: params.id, page: 1 }),
            getDraftJobs({ identityId: params.id, page: 1 }),
            getArchivedJobs({ identityId: params.id, page: 1 }),
            getJobCategories(),
          ];
          const [activeJobs, draftJobs, archivedJobs, jobCategories] = await Promise.all(requests);
          return { activeJobs, draftJobs, archivedJobs, jobCategories };
        },
        async lazy() {
          const { MyJobs } = await import('../../pages/job-create/my-jobs/my-jobs.container');
          return { Component: MyJobs };
        },
      },
      {
        path: 'received-offer/:id',
        loader: async ({ params }) => {
          let media = { url: '' };
          const { offer } = await receivedOfferLoader(params);
          if (offer.applicant?.attachment) {
            media = await getMedia(offer.applicant.attachment);
          }
          return { offer, media };
        },
        async lazy() {
          const { OfferReceived } = await import('../../pages/offer-received/offer-received.container');
          return { Component: OfferReceived };
        },
      },
    ],
  },
  {
    element: <Layout />,
    loader: jobsPageLoader,
    children: [
      {
        path: 'feeds',
        async lazy() {
          const { Feeds } = await import('../../pages/feed/refactored/feed');
          return {
            Component: Feeds,
          };
        },
        loader: () => posts({ page: 1 }),
      },
      {
        path: 'feeds/:id',
        async lazy() {
          const { FeedDetails } = await import('../../pages/feed/refactored/feedDetails/feedDetails');
          return {
            Component: FeedDetails,
          };
        },
        loader: async ({ params }) => {
          const requests = [getPost(params.id!), postComments(params.id!, { page: 1 })];
          const [post, comments] = await Promise.all(requests);
          return { post, comments };
        },
      },
      {
        path: 'jobs',
        async lazy() {
          const { Jobs } = await import('../../pages/jobs');
          const jobsList = await jobs({ page: 1 });
          return {
            Component: Jobs,
            Loader: jobsList,
          };
        },
      },
    ],
  },
  {
    element: isTouchDevice() ? <RootTouchLayout /> : <RootCursorLayout />,
    loader: jobsPageLoader,
    children: [
      {
        path: 'd/chats',
        children: [
          {
            path: 'new/:id',
            async lazy() {
              const { NewChat } = await import('src/pages/chat/new-chat/new-chat');
              return {
                Component: NewChat,
              };
            },
            loader: async ({ params }) => {
              const createdChats = await createChat({ name: 'nameless', type: 'CHAT', participants: [params.id] });
              return createdChats?.id;
            },
          },
          {
            path: 'contacts/:id',
            async lazy() {
              const { MessageDetail } = await import('src/pages/chat/message-detail/message-detail.container');
              return {
                Component: MessageDetail,
              };
            },
            loader: async ({ params }) => {
              const requests = [
                chatMessages(params.id, { page: 1 }),
                getChatParticipantsById(params.id),
                chats({ page: 1 }),
                getFollowings({ page: 1 }),
              ];
              const [messages, participants, summery, followings] = await Promise.all(requests);
              return {
                messages,
                participants,
                summery,
                followings,
              };
            },
          },
          {
            path: 'contacts',
            async lazy() {
              const { ContactList } = await import('src/pages/chat/contact-list/contact-list.container');
              return {
                Component: ContactList,
              };
            },
            loader: async () => {
              const requests = [chats({ page: 1 }), getFollowings({ page: 1 })];
              const [summery, followings] = await Promise.all(requests);
              return { summery, followings };
            },
          },
        ],
      },
      {
        path: 'notifications',
        children: [
          {
            path: '',
            async lazy() {
              const { Notifications } = await import('src/pages/notifications/notifications.container');
              return {
                Component: Notifications,
              };
            },
            loader: () => notifications({ page: 1 }),
          },
          {
            path: 'settings',
            async lazy() {
              const { Settings } = await import('src/pages/notifications/settings/settings.container');
              return {
                Component: Settings,
              };
            },
            loader: () => notificationSettings(),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <div>Page not found :(</div>,
  },
];
function DefaultRoute(): JSX.Element {
  const state = store.getState().identity.entities;
  if (state.length) {
    return <Navigate to="/jobs" />;
  } else {
    return <Navigate to="/intro" />;
  }
}
export const routes = createBrowserRouter(blueprint);

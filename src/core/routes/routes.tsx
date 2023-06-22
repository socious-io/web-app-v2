import { Navigate, Route } from '@tanstack/react-location';
import { getChatsSummery, getFollowings } from '../../pages/chat/contact-list/contact-list.services';
import { MenuCursor as RootCursorLayout } from '../../components/templates/menu-cursor/menu-cursor';
import { MenuTouch as RootTouchLayout } from '../../components/templates/menu-touch/menu-touch';
import { isTouchDevice } from '../device-type-detector';
import { getMessagesById, getParticipantsById } from '../../pages/chat/message-detail/message-detail.services';
import { createChats } from '../../pages/chat/new-chat/new-chat.services';
import { getActiveJobs, getDraftJobs } from '../../pages/job-create/my-jobs/my-jobs.services';
import { getFeedList } from '../../pages/feed/mobile/mobile.service';
import { getComments, getPostDetail } from '../../pages/feed/post-detail/post-detail.service';
import { getJobCategories } from '../../pages/job-create/info/info.services';
import { search } from '../../pages/search/search.services';
import { getNotificationList } from '../../pages/notifications/notifications.service';
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
import { profileUserPageLoader } from 'src/pages/profile-user/profile-user.loader';
import { AchievementsPageLoader } from 'src/pages/achievements/achievements.loader';
import { profileOrganizationPageLoader } from 'src/pages/profile-organization/profile-organization.loader';
import { getSettingsItems } from 'src/pages/notifications/settings/settings.service';
import { getJobList } from 'src/pages/jobs/jobs.services';
import { getCreditCardInfo, getCreditCardInfoById } from 'src/pages/payment/payment.service';
import { getMissionsList, getSrtipeProfile } from 'src/pages/wallet/wallet.service';

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
          {
            path: '/email',
            element: () =>
              import('../../pages/sign-up/sign-up-user-email/sign-up-user-email.container').then((m) => (
                <m.SignUpUserEmailContainer />
              )),
          },
          {
            path: '/verification',
            element: () =>
              import('../../pages/sign-up/sign-up-user-verification/sign-up-user-verification.container').then((m) => (
                <m.SignUpUserVerificationContainer />
              )),
          },
          {
            path: '/complete',
            element: () =>
              import('../../pages/sign-up/sign-up-user-complete/sign-up-user-complete.container').then((m) => (
                <m.SignUpUserCompleteContainer />
              )),
          },
        ],
      },
    ],
  },
  {
    path: 'forget-password',
    children: [
      {
        path: '/email',
        element: () => import('../../pages/forget-password/email/email.container').then((m) => <m.Email />),
      },
      {
        path: '/otp',
        element: () => import('../../pages/forget-password/otp/otp.container').then((m) => <m.Otp />),
      },
      {
        path: '/password',
        element: () => import('../../pages/forget-password/password/password.container').then((m) => <m.Password />),
      },
    ],
  },
  {
    loader: jobsPageLoader,
    // pendingElement: 'loading...',
    // pendingMs: 0,
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
      {
        path: 'change-password',
        element: () =>
          import('../../pages/change-password/change-password.container').then((m) => <m.ChangePasswordContainer />),
      },
      {
        path: 'payment/:id',
        children: [
          {
            path: '/add-card',
            loader: async () => {
              const [cardInfo] = await Promise.all([getCreditCardInfo()]);
              return cardInfo;
            },
            element: () =>
              import('../../pages/payment/credit-card/credit-card.container').then((m) => <m.CreditCard />),
          },
          {
            path: '/edit-card/:id',
            loader: async ({ params }) => {
              const [cardInfo] = await Promise.all([getCreditCardInfoById(params.id)]);
              return cardInfo;
            },
            element: () =>
              import('../../pages/payment/credit-card/credit-card.container').then((m) => <m.CreditCard />),
          },
          {
            loader: async ({ params }) => {
              const requests = [receivedOfferLoader(params), getCreditCardInfo()];
              const [offerReq, cardInfo] = await Promise.all(requests);
              const { offer } = offerReq;
              return { offer, cardInfo };
            },
            element: () => import('../../pages/payment/payment.container').then((m) => <m.Payment />),
          },
        ],
      },
      {
        path: '/achievements/m',
        loader: AchievementsPageLoader,
        element: () => import('../../pages/achievements/mobile/achievements').then((m) => <m.Mobile />),
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
            path: 'new/:id',
            loader: async ({ params }) => {
              const createdChats = await createChats({ name: 'nameless', type: 'CHAT', participants: [params.id] });
              return createdChats?.id;
            },
            element: () => import('../../pages/chat/new-chat/new-chat').then((m) => <m.NewChat />),
          },
          {
            path: 'contacts/:id',
            loader: async ({ params }) => {
              const requests = [
                getMessagesById({ id: params.id, page: 1 }),
                getParticipantsById(params.id),
                getChatsSummery({ page: 1, filter: '' }),
                getFollowings({ page: 1, name: '' }),
              ];
              const [messages, participants, summery, followings] = await Promise.all(requests);
              return {
                messages,
                participants,
                summery,
                followings,
              };
            },
            element: () =>
              import('../../pages/chat/message-detail/message-detail.container').then((m) => <m.MessageDetail />),
          },
          {
            path: 'contacts',
            loader: async () => {
              const requests = [getChatsSummery({ page: 1, filter: '' }), getFollowings({ page: 1, name: '' })];
              const [summery, followings] = await Promise.all(requests);
              return {
                summery,
                followings,
              };
            },
            element: () =>
              import('../../pages/chat/contact-list/contact-list.container').then((m) => <m.ContactList />),
          },
        ],
      },
      {
        path: 'm/jobs/created/:id/overview',
        children: [
          {
            path: '/:applicantId/offer',
            loader: async ({ params }) => {
              const requests = [getApplicantDetail(params.applicantId)];
              const [applicantDetail] = await Promise.all(requests);
              return { applicantDetail };
            },
            element: () => import('../../pages/job-offer-reject/offer/offer.container').then((m) => <m.Offer />),
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
            element: () =>
              import('../../pages/job-offer-reject/job-offer-reject.container').then((m) => <m.JobOfferReject />),
          },
        ],
      },
      {
        path: '/m/jobs/created/:id',
        loader: async ({ params }) => {
          const requests = [
            getActiveJobs({ identityId: params.id, page: 1 }),
            getDraftJobs({ identityId: params.id, page: 1 }),
            getJobCategories(),
          ];
          const [activeJobs, draftJobs, jobCategories] = await Promise.all(requests);
          return { activeJobs, draftJobs, jobCategories };
        },
        element: () => import('../../pages/job-create/my-jobs/my-jobs.container').then((m) => <m.MyJobs />),
      },
      {
        path: '/jobs/create',
        children: [
          {
            path: 'social-causes',
            element: () =>
              import('../../pages/job-create/social-causes/social-causes.container').then((m) => <m.SocialCauses />),
          },
          {
            path: 'skills',
            element: () => import('../../pages/job-create/skills/skills.container').then((m) => <m.Skills />),
          },
          {
            path: 'info',
            loader: () => getJobCategories(),
            element: () => import('../../pages/job-create/info/info.container').then((m) => <m.Info />),
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
        element: () => import('../../pages/feed/post-detail/post-detail.container').then((m) => <m.PostDetail />),
      },
      {
        path: 'search',
        element: () => import('../../pages/search/search').then((m) => <m.Search />),
        loader: (p) => {
          return search({ filter: {}, q: p.search.q as string, type: 'projects', page: 1 });
        },
      },
      {
        path: 'wallet',
        element: () => import('../../pages/wallet/wallet.container').then((m) => <m.Wallet />),
        loader: async () => {
          const requests = [getMissionsList({ page: 1 }), getSrtipeProfile()];
          const [missionsList, stripeProfile] = await Promise.all(requests);
          return { missionsList, stripeProfile };
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
        element: () => import('../../pages/job-apply/apply/apply.container').then((m) => <m.JobApply />),
      },
      {
        path: '/jobs/received-offer/:id/m',
        loader: async ({ params }) => {
          let media = { url: '' };
          const { offer } = await receivedOfferLoader(params);
          if (offer.applicant?.attachment) {
            media = await endpoint.get.media['media_id'](offer.applicant.attachment);
          }
          return { offer, media };
        },
        element: () => import('../../pages/offer-received/offer-received.container').then((m) => <m.OfferReceived />),
      },
      {
        path: '/jobs/applied/complete-mission/:id',
        loader: async ({ params }) => {
          let media = { url: '' };
          const mission = await endpoint.get.missions.mission_id(params.id);
          const offer = await endpoint.get.offers.offer_id(mission.offer_id);
          if (offer.applicant?.attachment) {
            media = await endpoint.get.media['media_id'](offer.applicant.attachment);
          }
          return { mission, offer, media };
        },
        element: () =>
          import('../../pages/complete-mission/complete-mission.container').then((m) => <m.CompleteMission />),
      },
      {
        path: 'm/jobs/applied',
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
            path: 'd/jobs/created/:id/overview',
            children: [
              {
                path: '/:applicantId/offer',
                loader: async ({ params }) => {
                  const requests = [getApplicantDetail(params.applicantId)];
                  const [applicantDetail] = await Promise.all(requests);
                  return { applicantDetail };
                },
                element: () => import('../../pages/job-offer-reject/offer/offer.container').then((m) => <m.Offer />),
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
                element: () =>
                  import('../../pages/job-offer-reject/job-offer-reject.container').then((m) => <m.JobOfferReject />),
              },
            ],
          },
          {
            path: '/d/jobs/created/:id',
            loader: async ({ params }) => {
              const requests = [
                getActiveJobs({ identityId: params.id, page: 1 }),
                getDraftJobs({ identityId: params.id, page: 1 }),
                getJobCategories(),
              ];
              const [activeJobs, draftJobs, jobCategories] = await Promise.all(requests);
              return { activeJobs, draftJobs, jobCategories };
            },
            element: () => import('../../pages/job-create/my-jobs/my-jobs.container').then((m) => <m.MyJobs />),
          },
          {
            path: '/jobs/received-offer/:id/d',
            loader: async ({ params }) => {
              let media = { url: '' };
              const { offer } = await receivedOfferLoader(params);
              if (offer.applicant?.attachment) {
                media = await endpoint.get.media['media_id'](offer.applicant.attachment);
              }
              return { offer, media };
            },
            element: () =>
              import('../../pages/offer-received/offer-received.container').then((m) => <m.OfferReceived />),
          },
          {
            path: '/d/jobs/applied',
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
            path: '/jobs/:id',
            loader: async ({ params }) => {
              const requests = [endpoint.get.projects.project_id(params.id), getScreeningQuestions(params.id)];
              const [jobDetail, screeningQuestions] = await Promise.all(requests);
              return { jobDetail, screeningQuestions };
            },
            element: () => import('../../pages/job-detail/job-detail.container').then((m) => <m.JobDetailContainer />),
          },
          {
            path: '/jobs',
            element: () => import('../../pages/jobs/jobs.container').then((m) => <m.JobsContainer />),
            loader: () => getJobList({ page: 1 }),
          },
          {
            path: '/achievements/d',
            loader: AchievementsPageLoader,
            element: () => import('../../pages/achievements/desktop/desktop').then((m) => <m.Desktop />),
          },
          {
            path: 'profile/users/:id',
            loader: profileUserPageLoader,
            children: [
              {
                path: 'view',
                element: () =>
                  import('../../pages/profile-user/profile-user.container').then((m) => <m.ProfileUserContainer />),
              },
              {
                path: 'edit',
                element: () =>
                  import('../../pages/profile-user-edit/profile-user-edit.container').then((m) => (
                    <m.ProfileUserEditContainer />
                  )),
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
                  import('../../pages/profile-organization/profile-organization.container').then((m) => (
                    <m.ProfileOrganizationContainer />
                  )),
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
            path: 'notifications',
            children: [
              {
                path: '/settings',
                element: () =>
                  import('src/pages/notifications/settings/settings.container').then((m) => <m.Settings />),
                loader: () => getSettingsItems(),
              },
              {
                element: () =>
                  import('../../pages/notifications/notifications.container').then((m) => <m.Notifications />),
                loader: () => getNotificationList({ page: 1 }),
              },
            ],
          },

          {
            path: 'feeds',
            element: () => import('../../pages/feed/feed.container').then((m) => <m.Feed />),
            loader: () => getFeedList({ page: 1 }),
          },
          {
            path: 'network',
            children: [
              {
                path: '/connections',
                element: () =>
                  import('src/pages/network/connections/connections.container').then((m) => <m.Connections />),
              },
              {
                path: '/followings',
                element: () =>
                  import('src/pages/network/followings/followings.container').then((m) => <m.Followings />),
                loader: () => getFollowings({ page: 1, name: '' }),
              },
              {
                element: () => import('src/pages/network/network.container').then((m) => <m.Network />),
              },
            ],
          },
          {
            element: <Navigate to="/jobs" />,
          },
        ],
      },
    ],
  },
];

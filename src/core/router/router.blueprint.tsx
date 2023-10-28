import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import Layout from 'src/components/templates/refactored/layout/layout';
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
  stripeProfile,
  jobCategories as jobCategoriesReq,
  jobQuestions,
  applicant,
  getMedia,
  userPaidMissions,
  profile,
  job,
  getMission,
  getOffer,
  otherProfileByUsername,
  badges,
  userMissions,
  impactPoints,
  filterFollowings,
  getOrganizationMembers,
} from 'src/core/api';
import FallBack from 'src/pages/fall-back/fall-back';
import {
  getAwaitingReviewList,
  getDeclinedApplicants,
  getEndedList,
  getOnGoingList,
  getPendingApplicants,
} from 'src/pages/job-apply/my-jobs/my-jobs.services';
import { jobOfferRejectLoader } from 'src/pages/job-offer-reject/job-offer-reject.services';
import { receivedOfferLoader } from 'src/pages/offer-received/offer-received.services';
import { getCreditCardInfo, getCreditCardInfoById } from 'src/pages/payment/payment.service';
import { profileOrganizationPageLoader } from 'src/pages/profile-organization/profile-organization.loader';
import { search } from 'src/pages/search/desktop/search.services';
import { RootState } from 'src/store';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: 'feeds',
            async lazy() {
              const { Feeds } = await import('src/pages/feed/refactored/feed');
              return {
                Component: Feeds,
              };
            },
            loader: () => posts({ page: 1 }),
          },
          {
            path: 'feeds/:id',
            async lazy() {
              const { FeedDetails } = await import('src/pages/feed/refactored/feedDetails/feedDetails');
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
            path: 'chats',
            children: [
              {
                path: 'new/:id',
                async lazy() {
                  const { NewChat } = await import('src/pages/chat/new-chat/new-chat');
                  return {
                    Component: Protect(NewChat),
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
                    Component: Protect(MessageDetail),
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
                    Component: Protect(ContactList),
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
            path: '/jobs',
            children: [
              {
                path: '',
                loader: async () => {
                  const data = await jobs({ page: 1, status: 'ACTIVE' });
                  return { data };
                },
                async lazy() {
                  const { Jobs } = await import('src/pages/jobs');
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
                  const { CompleteMission } = await import('src/pages/complete-mission/complete-mission.container');
                  return {
                    Component: CompleteMission,
                  };
                },
              },
              {
                path: ':id',
                loader: async ({ params }) => {
                  const requests = [job(params.id), jobQuestions(params.id)];
                  const [jobDetail, screeningQuestions] = await Promise.all(requests);
                  return { jobDetail, screeningQuestions };
                },
                async lazy() {
                  const { JobDetailContainer } = await import('src/pages/job-detail/job-detail.container');
                  return { Component: JobDetailContainer };
                },
              },
              {
                path: ':id/apply',
                loader: async ({ params }) => {
                  const requests = [job(params.id), jobQuestions(params.id)];
                  const [jobDetail, screeningQuestions] = await Promise.all(requests);
                  return { jobDetail, screeningQuestions };
                },
                async lazy() {
                  const { JobApply } = await import('src/pages/job-apply/apply/apply.container');
                  return { Component: JobApply };
                },
              },

              {
                path: 'created/:id/overview/:applicantId/offer',
                loader: async ({ params }) => {
                  const requests = [applicant(params.applicantId)];
                  const [applicantDetail] = await Promise.all(requests);
                  return { applicantDetail };
                },
                async lazy() {
                  const { Offer } = await import('src/pages/job-offer-reject/offer/offer.container');
                  return { Component: Offer };
                },
              },
              {
                path: 'created/:id/overview/:applicantId',
                loader: async ({ params }) => {
                  const requests = [jobQuestions(params.id), applicant(params.applicantId)];
                  const [screeningQuestions, applicantDetail] = await Promise.all(requests);
                  return { applicantDetail, screeningQuestions };
                },
                async lazy() {
                  const { ApplicantDetail } = await import(
                    'src/pages/job-offer-reject/applicant-detail/applicant-detail'
                  );
                  return { Component: ApplicantDetail };
                },
              },
              {
                path: 'created/:id/overview',
                loader: (params) => jobOfferRejectLoader(params),
                async lazy() {
                  const { JobOfferReject } = await import('src/pages/job-offer-reject/job-offer-reject.container');
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
                async lazy() {
                  const { MyJobs } = await import('src/pages/job-apply/my-jobs/my-jobs');
                  return { Component: MyJobs };
                },
              },
              {
                path: 'created/:id',
                loader: async ({ params }) => {
                  const requests = [
                    jobs({ identity_id: params.id, page: 1, status: 'ACTIVE' }),
                    jobs({ identity_id: params.id, page: 1, status: 'DRAFT' }),
                    jobs({ identity_id: params.id, page: 1, status: 'EXPIRE' }),
                    jobCategoriesReq(),
                  ];
                  const [activeJobs, draftJobs, archivedJobs, jobCategories] = await Promise.all(requests);
                  return { activeJobs, draftJobs, archivedJobs, jobCategories };
                },
                async lazy() {
                  const { MyJobs } = await import('src/pages/job-create/my-jobs/my-jobs.container');
                  return { Component: MyJobs };
                },
              },
              {
                path: 'received-offer/:id/*',
                loader: async ({ params }) => {
                  let media = { url: '' };
                  const offer = await getOffer(params.id);
                  if (offer.applicant?.attachment) {
                    media = await getMedia(offer.applicant.attachment);
                  }
                  return { offer, media };
                },
                async lazy() {
                  const { OfferReceived } = await import('src/pages/offer-received/offer-received.container');
                  return { Component: OfferReceived };
                },
              },
              {
                path: 'create',
                children: [
                  {
                    path: 'social-causes',
                    async lazy() {
                      const { SocialCauses } = await import(
                        'src/pages/job-create/social-causes/social-causes.container'
                      );
                      return { Component: SocialCauses };
                    },
                  },
                  {
                    path: 'skills',
                    async lazy() {
                      const { Skills } = await import('src/pages/job-create/skills/skills.container');
                      return { Component: Skills };
                    },
                  },
                  {
                    path: 'info',
                    loader: async () => {
                      const jobs = jobCategoriesReq();
                      return jobs;
                    },
                    async lazy() {
                      const { Info } = await import('src/pages/job-create/info/info.container');
                      return { Component: Info };
                    },
                  },
                  {
                    path: 'screener-questions/created/:id',
                    async lazy() {
                      const { ScreenerQuestions } = await import(
                        'src/pages/job-create/screener-questions/screener-questions.container'
                      );
                      return { Component: ScreenerQuestions };
                    },
                  },
                  {
                    path: 'screener-questions',
                    async lazy() {
                      const { ScreenerQuestions } = await import(
                        'src/pages/job-create/screener-questions/screener-questions.container'
                      );
                      return { Component: ScreenerQuestions };
                    },
                  },
                ],
              },
              {
                path: 'edit',
                children: [
                  {
                    path: 'social-causes/:id',
                    loader: async ({ params }) => {
                      const overview = await job(params.id);
                      return { overview };
                    },
                    async lazy() {
                      const { SocialCauses } = await import('src/pages/job-edit/social-causes/social-causes.container');
                      return { Component: SocialCauses };
                    },
                  },
                  {
                    path: 'skills/:id',
                    loader: async ({ params }) => {
                      const overview = await job(params.id);
                      return { overview };
                    },
                    async lazy() {
                      const { Skills } = await import('src/pages/job-edit/skills/skills.container');
                      return { Component: Skills };
                    },
                  },
                  {
                    path: 'info/:id',
                    loader: async ({ params }) => {
                      const jobs = jobCategoriesReq();
                      const requests = [jobCategoriesReq(), job(params.id)];
                      const [jobCategories, overview] = await Promise.all(requests);
                      return { jobCategories, overview };
                    },
                    async lazy() {
                      const { Info } = await import('src/pages/job-edit/info/info.container');
                      return { Component: Info };
                    },
                  },
                  {
                    path: 'screener-questions',
                    async lazy() {
                      const { ScreenerQuestions } = await import(
                        'src/pages/job-edit/screener-questions/screener-questions.container'
                      );
                      return { Component: ScreenerQuestions };
                    },
                  },
                  {
                    path: 'screener-questions/:id',
                    async lazy() {
                      const { ScreenerQuestions } = await import(
                        'src/pages/job-edit/screener-questions/screener-questions.container'
                      );
                      return { Component: ScreenerQuestions };
                    },
                    loader: async ({ params }) => {
                      const defaultQuestions = await jobQuestions(params.id);
                      return { defaultQuestions };
                    },
                  },
                ],
              },
            ],
          },
          {
            path: 'profile/organizations',
            children: [
              {
                path: ':id',
                children: [
                  {
                    path: 'view',
                    loader: async ({ params }) => {
                      const user = profileOrganizationPageLoader({ params });
                      return user;
                    },
                    async lazy() {
                      const { ProfileOrg } = await import('src/pages/profile-organization/refactored/profileOrg');
                      return { Component: ProfileOrg };
                    },
                  },
                  {
                    path: 'edit',
                    loader: async ({ params }) => {
                      const user = profileOrganizationPageLoader({ params });
                      return user;
                    },
                    async lazy() {
                      const { ProfileOrganizationEdit } = await import(
                        'src/pages/profile-organization-edit/profile-organization-edit'
                      );
                      return { Component: ProfileOrganizationEdit };
                    },
                  },
                  {
                    path: 'jobs',
                    loader: async ({ params }) => {
                      const user = profileOrganizationPageLoader({ params });
                      return user;
                    },
                    async lazy() {
                      const { JobsIndexContainer } = await import('../../pages/jobs-index/jobs-index.container');
                      return { Component: JobsIndexContainer };
                    },
                  },
                ],
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
                    Component: Protect(Notifications),
                  };
                },
                loader: () => notifications({ page: 1 }),
              },
              {
                path: 'settings',
                async lazy() {
                  const { Settings } = await import('src/pages/notifications/settings/settings.container');
                  return {
                    Component: Protect(Settings),
                  };
                },
                loader: () => notificationSettings(),
              },
              {
                path: ':id',
                async lazy() {
                  const { DeepLinks } = await import('src/pages/notifications/deepLinks/index');
                  return {
                    Component: DeepLinks,
                  };
                },
              },
            ],
          },
          {
            path: 'network',
            children: [
              {
                path: '',
                async lazy() {
                  const { Network } = await import('src/pages/network/network.container');
                  return {
                    Component: Protect(Network),
                  };
                },
              },
              {
                path: 'connections',
                async lazy() {
                  const { Connections } = await import('src/pages/network/connections/connections.container');
                  return {
                    Component: Protect(Connections),
                  };
                },
              },
              {
                path: 'followings',
                async lazy() {
                  const { Followings } = await import('src/pages/network/followings/followings.container');
                  return {
                    Component: Protect(Followings),
                  };
                },
                loader: () => getFollowings({ page: 1 }),
              },
            ],
          },
          {
            path: 'wallet',
            async lazy() {
              const { Wallet } = await import('src/pages/wallet/wallet.container');

              return {
                Component: Protect(Wallet),
              };
            },
            loader: async () => {
              const requests = [
                userPaidMissions({ page: 1, 'filter.p.payment_type': 'PAID', 'filter.status': 'CONFIRMED' }),
                stripeProfile({}),
                stripeProfile({ is_jp: true }),
              ];
              const [missionsList, stripeProfileRes, jpStripeProfileRes] = await Promise.all(requests);
              return { missionsList, stripeProfileRes, jpStripeProfileRes };
            },
          },
          {
            path: '/payment/:id',
            children: [
              {
                path: 'add-card',
                loader: async () => {
                  const [cardInfo] = await Promise.all([getCreditCardInfo()]);
                  return cardInfo;
                },
                async lazy() {
                  const { CreditCard } = await import('src/pages/payment/credit-card/credit-card.container');
                  return {
                    Component: Protect(CreditCard),
                  };
                },
              },
              {
                path: 'edit-card/:id',
                loader: async ({ params }) => {
                  const [cardInfo] = await Promise.all([getCreditCardInfoById(params.id)]);
                  return cardInfo;
                },
                async lazy() {
                  const { CreditCard } = await import('src/pages/payment/credit-card/credit-card.container');
                  return {
                    Component: Protect(CreditCard),
                  };
                },
              },
              {
                path: '',
                loader: async ({ params }) => {
                  const { offer } = await receivedOfferLoader(params);
                  const cardInfo = await getCreditCardInfo(offer.currency === 'JPY');
                  return { offer, cardInfo };
                },
                async lazy() {
                  const { Payment } = await import('src/pages/payment/payment.container');
                  return {
                    Component: Protect(Payment),
                  };
                },
              },
            ],
          },
          {
            path: 'team/:id',
            async lazy() {
              const { Team } = await import('src/pages/team/team.container');

              return {
                Component: Team,
              };
            },
            loader: async ({ params }) => {
              const requests = [
                getOrganizationMembers(params.id, { page: 1 }),
                filterFollowings({ page: 1, name: '', type: 'users' }),
              ];
              const [members, followings] = await Promise.all(requests);
              return { members, followings };
            },
          },
          {
            path: 'organization',
            children: [
              {
                path: 'create',
                children: [
                  {
                    path: 'intro',
                    async lazy() {
                      const { Intro } = await import('src/pages/organization-create/intro/intro');
                      return {
                        Component: Intro,
                      };
                    },
                  },
                  {
                    path: 'type',
                    async lazy() {
                      const { Type } = await import('src/pages/organization-create/type/type');
                      return {
                        Component: Type,
                      };
                    },
                  },
                  {
                    path: 'social-causes',
                    async lazy() {
                      const { SocialCauses } = await import(
                        'src/pages/organization-create/social-causes/social-causes'
                      );
                      return {
                        Component: SocialCauses,
                      };
                    },
                  },
                  {
                    path: 'profile',
                    async lazy() {
                      const { Profile } = await import('src/pages/organization-create/profile/profile');
                      return {
                        Component: Profile,
                      };
                    },
                  },
                  {
                    path: 'mission',
                    async lazy() {
                      const { Mission } = await import('src/pages/organization-create/mission/mission');
                      return {
                        Component: Mission,
                      };
                    },
                  },
                  {
                    path: 'culture',
                    async lazy() {
                      const { Culture } = await import('src/pages/organization-create/culture/culture');
                      return {
                        Component: Culture,
                      };
                    },
                  },
                  {
                    path: 'social-impact',
                    async lazy() {
                      const { SocialImpact } = await import(
                        'src/pages/organization-create/social-impact/social-impact'
                      );
                      return {
                        Component: SocialImpact,
                      };
                    },
                  },
                  {
                    path: 'succeed',
                    async lazy() {
                      const { Succeed } = await import('src/pages/organization-create/succeed/succeed');
                      return {
                        Component: Succeed,
                      };
                    },
                  },
                  {
                    path: 'verified',
                    async lazy() {
                      const { Verified } = await import('src/pages/organization-create/verified/verified');
                      return {
                        Component: Verified,
                      };
                    },
                  },
                ],
              },
            ],
          },
          {
            path: 'profile/users',
            children: [
              {
                path: ':id',
                children: [
                  {
                    path: 'view',
                    loader: async ({ params }) => {
                      // TODO: need to load on parent and pass wit props
                      const user = await otherProfileByUsername(params.id);
                      const [userBadges, missions] = await Promise.all([badges(user.id), userMissions(user.id)]);
                      return {
                        user,
                        badges: userBadges,
                        missions,
                      };
                    },
                    async lazy() {
                      const { ProfileUser } = await import('src/pages/profile-user/refactored/profileUser');
                      return {
                        Component: ProfileUser,
                      };
                    },
                  },
                  {
                    path: 'edit',
                    loader: profile,
                    async lazy() {
                      const { ProfileUserEditContainer } = await import(
                        'src/pages/profile-user-edit/profile-user-edit.container'
                      );
                      return {
                        Component: ProfileUserEditContainer,
                      };
                    },
                  },
                ],
              },
            ],
          },
          {
            path: '/achievements',
            loader: async () => {
              const [userBadges, impactPointHistory] = await Promise.all([badges(), impactPoints()]);
              return { badges: userBadges, impactPointHistory };
            },
            async lazy() {
              const { AchievementsContainer } = await import('src/pages/achievements/achievements.container');
              return {
                Component: AchievementsContainer,
              };
            },
          },
          {
            path: 'search',
            children: [
              {
                path: '',
                async lazy() {
                  const { Search } = await import('src/pages/search/desktop/search');
                  return {
                    Component: Search,
                  };
                },
                loader: async ({ request }) => {
                  const url = new URL(request.url);
                  const q = url.searchParams.get('q');
                  const data = await search({ filter: {}, q: q as string, type: 'projects' });
                  return data;
                },
              },
            ],
          },
        ],
      },
    ],
    errorElement: <ErrorBoundary />,
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
                'src/pages/sign-up/sign-up-user-email/sign-up-user-email.container'
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
                'src/pages/sign-up/sign-up-user-verification/sign-up-user-verification.container'
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
                'src/pages/sign-up/sign-up-user-complete/sign-up-user-complete.container'
              );
              return {
                Component: SignUpUserCompleteContainer,
              };
            },
          },
          {
            path: 'welcome',
            async lazy() {
              const { Welcome } = await import('src/pages/sign-up/welcome/welcome');
              return {
                Component: Welcome,
              };
            },
          },
          {
            path: 'onboarding',
            async lazy() {
              const { SignUpUserOnboarding } = await import(
                'src/pages/sign-up/sign-up-user-onboarding/sign-up-user-complete.container'
              );
              return {
                Component: SignUpUserOnboarding,
              };
            },
          },
          {
            path: 'allow-notification',
            async lazy() {
              const { AllowNotification } = await import('src/pages/sign-up/AllowNotification');
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
          const { Email } = await import('src/pages/forget-password/email/email.container');
          return {
            Component: Email,
          };
        },
      },
      {
        path: 'otp',
        async lazy() {
          const { Otp } = await import('src/pages/forget-password/otp/otp.container');
          return {
            Component: Otp,
          };
        },
      },
      {
        path: 'password',
        async lazy() {
          const { Password } = await import('src/pages/forget-password/password/password.container');
          return {
            Component: Password,
          };
        },
      },
    ],
  },
  {
    path: 'change-password',
    async lazy() {
      const { ChangePasswordContainer } = await import('src/pages/change-password/change-password.container');
      return {
        Component: ChangePasswordContainer,
      };
    },
  },
  {
    path: 'delete-profile',
    children: [
      {
        path: 'delete',
        async lazy() {
          const { Delete } = await import('src/pages/delete-profile/delete/delete');
          return {
            Component: Delete,
          };
        },
      },
      {
        path: 'password',
        async lazy() {
          const { Password } = await import('src/pages/delete-profile/password/password');
          return {
            Component: Password,
          };
        },
      },
      {
        path: 'confirm',
        async lazy() {
          const { Confirm } = await import('src/pages/delete-profile/confirm/confirm');
          return {
            Component: Confirm,
          };
        },
      },
    ],
  },
  {
    path: '/intro',
    async lazy() {
      const { Intro } = await import('src/pages/intro/intro');
      return {
        Component: Intro,
      };
    },
  },
  {
    path: '/sign-in',
    async lazy() {
      const { SignInContainer } = await import('src/pages/sign-in/sign-in-container');
      return {
        Component: SignInContainer,
      };
    },
  },
  {
    path: 'privacy-policy',
    async lazy() {
      const { PrivacyPolicy } = await import('src/pages/privacy-policy/privacy-policy');
      return {
        Component: PrivacyPolicy,
      };
    },
  },
  {
    path: 'terms-conditions',
    async lazy() {
      const { TermsConditions } = await import('src/pages/terms-conditions/terms-conditions');
      return {
        Component: TermsConditions,
      };
    },
  },
  {
    path: '*',
    element: <div>Page not found :(</div>,
  },
];

function Protect<T extends {}>(Component: ComponentType<T>): ComponentType<T> {
  return function ProtectedRoute(props: T) {
    const status = useSelector((state: RootState) => state.identity.status);
    // TODO: We may notify user before redirect to intro page
    if (status === 'loading') return <div></div>;
    if (status === 'failed') return <Navigate to="/intro" />;
    return <Component {...props} />;
  };
}

function DefaultRoute(): JSX.Element {
  const status = useSelector((state: RootState) => state.identity.status);
  if (status === 'succeeded') return <Navigate to="/jobs" />;

  if (status === 'loading') return <div></div>;
  if (status === 'failed') return <Navigate to="/intro" />;

  return <Navigate to="/jobs" />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/intro" />;
  console.log(error);
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);

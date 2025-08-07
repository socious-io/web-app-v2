import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import {
  getServiceAdaptor,
  getServicesAdaptor,
  getStripAccountsAdaptor,
  jobCategoriesToDropdown,
  skillsToCategoryAdaptor,
} from 'src/core/adaptors';
import {
  jobs,
  chats,
  stripeProfile,
  jobCategories as jobCategoriesReq,
  jobQuestions,
  profile,
  job,
  otherProfileByUsername,
  badges,
  impactPoints,
  getOrganizationByShortName,
  getRequestedVerifyExperiences,
  connections as getConnections,
  payments,
  payment,
  getRequestedVerifyEducations,
  markedJobs,
  posts,
  dispute,
  CurrentIdentity,
  OrgMeta,
  disputes,
  invitations,
  cards,
} from 'src/core/api';
import { search as searchReq } from 'src/core/api/site/site.api';
import { translate } from 'src/core/utils';
import { Layout as NowruzLayout } from 'src/modules/layout';
import FallBack from 'src/pages/fallback/fallback';
import { RootState } from 'src/store';

import { getReviewsAdaptor } from '../adaptors/users/index.adaptors';
import { DeepLinks } from '../deepLinks';
import { checkSearchFilters } from '../utils';

export const blueprint: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <DeepLinks />
        <DefaultRoute />
      </>
    ),
  },
  {
    path: 'captcha',
    async lazy() {
      const { Captcha } = await import('src/pages/captcha');
      return {
        Component: Captcha,
      };
    },
  },
  {
    children: [
      {
        element: <NowruzLayout />,
        children: [
          {
            path: 'profile/users',
            children: [
              {
                path: ':id',
                children: [
                  {
                    path: 'view',
                    loader: async ({ params }) => {
                      if (params.id) {
                        const user = await otherProfileByUsername(params.id);
                        const services = await getServicesAdaptor(1, 5, {
                          identity_id: user?.id || '',
                          kind: 'SERVICE',
                        });
                        const reviews = await getReviewsAdaptor(1, 5);
                        // Keep this, it might be needed in the future
                        // const [userBadges, missions] = await Promise.all([badges(user.id), userMissions(user.id)]);
                        return {
                          user,
                          services: services.data,
                          reviews: reviews.data,
                          // badges: userBadges,
                          // missions,
                        };
                      }
                    },
                    async lazy() {
                      const { UserProfile } = await import('src/pages/userProfile');
                      return {
                        Component: UserProfile,
                      };
                    },
                  },
                  {
                    path: 'impact',
                    loader: async () => {
                      const [userBadges, impactPointHistory] = await Promise.all([badges(), impactPoints()]);
                      return { badges: userBadges, impactPointHistory };
                    },
                    async lazy() {
                      const { Impact } = await import('src/pages/impact');
                      return {
                        Component: Impact,
                      };
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
                      if (params.id) {
                        const organization = await getOrganizationByShortName(params.id);
                        const page = Number(localStorage.getItem('profileJobPage'));
                        localStorage.setItem('source', organization.shortname);
                        localStorage.removeItem('navigateToSearch');
                        const orgJobs = await jobs({
                          page: page,
                          status: 'ACTIVE',
                          limit: 2,
                          identity_id: organization.id,
                        });
                        const reviews = await getReviewsAdaptor(1, 5);

                        return {
                          organization,
                          orgJobs,
                          reviews: reviews.data,
                        };
                      }
                    },
                    async lazy() {
                      const { OrgProfile } = await import('src/pages/orgProfile');
                      return {
                        Component: OrgProfile,
                      };
                    },
                  },
                  {
                    path: 'jobs',

                    loader: async ({ params }) => {
                      if (params.id) {
                        const organization = await getOrganizationByShortName(params.id);
                        const page = Number(localStorage.getItem('profileJobPage'));
                        localStorage.setItem('source', organization.shortname);
                        localStorage.removeItem('navigateToSearch');
                        const orgJobs = await jobs({
                          page: page,
                          status: 'ACTIVE',
                          limit: 2,
                          identity_id: organization.id,
                        });
                        return {
                          organization,
                          orgJobs,
                        };
                      }
                    },
                    async lazy() {
                      const { OrgProfile } = await import('src/pages/orgProfile');
                      return {
                        Component: OrgProfile,
                      };
                    },
                  },
                ],
              },
            ],
          },
          {
            path: 'credentials',

            loader: async () => {
              const experiences = await getRequestedVerifyExperiences({ page: 1, limit: 10 });
              const educations = await getRequestedVerifyEducations({ page: 1, limit: 10 });
              const items = [...(experiences?.items || []), ...(educations?.items || [])];
              const total_count = (experiences?.total_count || 0) + (educations?.total_count || 0);
              const limit = 20;
              const page = 1;
              return {
                credentials: { items, total_count, limit, page },
              };
            },
            async lazy() {
              const { Credentials } = await import('src/pages/credentials');
              return {
                Component: Protect(Credentials, 'both'),
              };
            },
          },
          {
            path: 'jobs',
            children: [
              {
                path: 'create',
                loader: async () => {
                  const requests = [jobCategoriesReq()];
                  const [jobCategories] = await Promise.all(requests);
                  return { jobCategories };
                },
                async lazy() {
                  const { CreateJob } = await import('src/pages/jobs/Create');
                  return {
                    Component: CreateJob,
                  };
                },
              },
              {
                path: 'edit/:id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const requests = [jobCategoriesReq(), job(params.id)];
                    const [jobCategories, jobDetail] = await Promise.all(requests);
                    return { jobCategories, jobDetail };
                  }
                },
                async lazy() {
                  const { EditJob } = await import('src/pages/jobs/Edit');
                  return {
                    Component: EditJob,
                  };
                },
              },
              {
                path: 'created',
                async lazy() {
                  const { CreatedList } = await import('src/pages/jobs/Created');
                  return {
                    Component: Protect(CreatedList, 'organizations'),
                  };
                },
              },
              {
                path: 'created/:id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const requests = [job(params.id), jobQuestions(params.id)];
                    const [jobDetail, screeningQuestions] = await Promise.all(requests);
                    return { jobDetail, screeningQuestions };
                  }
                },
                async lazy() {
                  const { CreatedDetail } = await import('src/pages/jobs/detail/Created');
                  return {
                    Component: Protect(CreatedDetail, 'organizations'),
                  };
                },
              },
              {
                path: '',
                loader: async ({ request }) => {
                  const page = Number(new URL(request.url).searchParams.get('page') || 1);
                  const data = await jobs({ page, status: 'ACTIVE', limit: 10 });
                  return data;
                },
                async lazy() {
                  const { JobsList } = await import('src/pages/jobs/List');
                  return {
                    Component: JobsList,
                  };
                },
              },

              {
                path: ':id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const requests = [job(params.id), jobQuestions(params.id)];
                    const [jobDetail, screeningQuestions] = await Promise.all(requests);
                    return { jobDetail, screeningQuestions };
                  }
                },
                async lazy() {
                  const { JobDetail } = await import('src/pages/jobs/detail');
                  return { Component: JobDetail };
                },
              },
              {
                path: 'applied',
                async lazy() {
                  const { AppliedList } = await import('src/pages/jobs/Applied');
                  return {
                    Component: Protect(AppliedList, 'users'),
                  };
                },
              },
              {
                path: 'saved',
                loader: async ({ request }) => {
                  const page = Number(new URL(request.url).searchParams.get('page') || 1);
                  const data = await markedJobs({ page, 'filter.marked_as': 'SAVE', limit: 10 });
                  return data;
                },
                async lazy() {
                  const { JobsList } = await import('src/pages/jobs/List');
                  return {
                    Component: Protect(JobsList, 'users'),
                  };
                },
              },
              {
                path: 'recommended',

                async lazy() {
                  const { RecommendedList } = await import('src/pages/jobs/recommendedList');
                  return {
                    Component: Protect(RecommendedList, 'users'),
                  };
                },
              },
            ],
          },
          {
            path: 'services',
            children: [
              {
                path: ':id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const [serviceDetail] = await Promise.all([getServiceAdaptor(params.id)]);
                    return { serviceDetail: serviceDetail?.data };
                  }
                },
                async lazy() {
                  const { DetailService } = await import('src/pages/services/detail');
                  return {
                    Component: Protect(DetailService, 'both'),
                  };
                },
              },
              {
                path: ':id/pay',
                loader: async ({ params }) => {
                  if (params.id) {
                    const [serviceDetail, cardsList] = await Promise.all([getServiceAdaptor(params.id), cards({})]);
                    return { serviceDetail: serviceDetail?.data, cards: cardsList.items };
                  }
                },
                async lazy() {
                  const { ServicePay } = await import('src/pages/services/pay');
                  return {
                    Component: Protect(ServicePay, 'both'),
                  };
                },
              },
              {
                path: 'create',
                loader: async () => {
                  const requests = [jobCategoriesReq(), skillsToCategoryAdaptor(), getStripAccountsAdaptor()] as const;
                  const [jobCategories, skillCategories, stripeAccounts] = await Promise.all(requests);
                  return {
                    jobCategories: jobCategoriesToDropdown(jobCategories.categories),
                    skillCategories,
                    hasStripeAccounts: !!stripeAccounts.data?.length,
                  };
                },
                async lazy() {
                  const { CreateService } = await import('src/pages/services/create');
                  return {
                    Component: Protect(CreateService, 'users'),
                  };
                },
              },
              {
                path: 'edit/:id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const requests = [
                      jobCategoriesReq(),
                      skillsToCategoryAdaptor(),
                      getServiceAdaptor(params.id),
                      getStripAccountsAdaptor(),
                    ] as const;
                    const [jobCategories, skillCategories, serviceDetail, stripeAccounts] = await Promise.all(requests);
                    return {
                      jobCategories: jobCategoriesToDropdown(jobCategories.categories),
                      skillCategories,
                      serviceDetail: serviceDetail?.data,
                      hasStripeAccounts: !!stripeAccounts.data?.length,
                    };
                  }
                },
                async lazy() {
                  const { CreateService } = await import('src/pages/services/create');
                  return {
                    Component: Protect(CreateService, 'users'),
                  };
                },
              },
              {
                path: 'duplicate/:id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const requests = [
                      jobCategoriesReq(),
                      skillsToCategoryAdaptor(),
                      getServiceAdaptor(params.id),
                      getStripAccountsAdaptor(),
                    ] as const;
                    const [jobCategories, skillCategories, serviceDetail, stripeAccounts] = await Promise.all(requests);
                    return {
                      jobCategories: jobCategoriesToDropdown(jobCategories.categories),
                      skillCategories,
                      serviceDetail: serviceDetail?.data,
                      hasStripeAccounts: !!stripeAccounts.data?.length,
                    };
                  }
                },
                async lazy() {
                  const { CreateService } = await import('src/pages/services/create');
                  return {
                    Component: Protect(CreateService, 'users'),
                  };
                },
              },
            ],
          },
          {
            path: 'contracts',
            async lazy() {
              const { Contracts } = await import('src/pages/contracts');
              return {
                Component: Protect(Contracts, 'both'),
              };
            },
          },
          {
            path: 'disputes',
            children: [
              {
                path: '',
                loader: async () => {
                  const [submittedDisputes, receivedDisputes] = await Promise.all([
                    disputes({ limit: 10, page: 1, 'filter.direction': 'submitted' }),
                    disputes({ limit: 10, page: 1, 'filter.direction': 'received' }),
                  ]);
                  return { submittedDisputes, receivedDisputes };
                },
                async lazy() {
                  const { Disputes } = await import('src/pages/disputes');
                  return {
                    Component: Protect(Disputes, 'both'),
                  };
                },
              },
              {
                path: ':id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const disputeRes = await dispute(params.id);
                    return {
                      disputeRes,
                    };
                  }
                },
                async lazy() {
                  const { DisputeDetail } = await import('src/pages/disputes/disputeDetail');
                  return {
                    Component: Protect(DisputeDetail, 'both'),
                  };
                },
              },
              {
                path: 'contributor/:id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const disputeRes = await dispute(params.id);
                    return {
                      disputeRes,
                    };
                  }
                },
                async lazy() {
                  const { DisputeDetail } = await import('src/pages/disputes/disputeDetail');
                  return {
                    Component: Protect(DisputeDetail, 'both'),
                  };
                },
              },
            ],
          },
          {
            path: 'payments',
            children: [
              {
                path: '',
                loader: async () => {
                  const requests = [
                    payments({ page: 1, limit: 10 }),
                    stripeProfile({}),
                    stripeProfile({ is_jp: true }),
                  ];
                  const [paymentRes, stripeProfileRes, jpStripeProfileRes] = await Promise.all(requests);
                  return { paymentRes, stripeProfileRes, jpStripeProfileRes };
                },
                async lazy() {
                  const { Wallet } = await import('src/pages/wallet');
                  return {
                    Component: Protect(Wallet, 'both'),
                  };
                },
              },
              {
                path: ':id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const requests = [payment(params.id), stripeProfile({}), stripeProfile({ is_jp: true })];
                    const [paymentRes, stripeProfileRes, jpStripeProfileRes] = await Promise.all(requests);
                    return { paymentRes, stripeProfileRes, jpStripeProfileRes };
                  }
                },
                async lazy() {
                  const { TransactionDetails } = await import('src/pages/wallet/transactionDetails');
                  return { Component: TransactionDetails };
                },
              },
            ],
          },
          {
            path: 'chats/*',
            loader: async () => {
              const summary = await chats({ page: 1 });
              return { summary };
            },
            async lazy() {
              const { Chats } = await import('src/pages/chats');
              return {
                Component: Protect(Chats, 'both'),
              };
            },
          },
          {
            path: 'search',
            children: [
              {
                path: '',
                async lazy() {
                  const { Search } = await import('src/pages/search');
                  return {
                    Component: Search,
                  };
                },
                loader: async ({ request }) => {
                  const { searchParams } = new URL(request.url);
                  const page = Number(searchParams.get('page') || 1);
                  const q = searchParams.get('q') || '';
                  const type = (searchParams.get('type') ?? 'projects') as
                    | 'projects'
                    | 'users'
                    | 'posts'
                    | 'organizations'
                    | 'services';

                  localStorage.setItem('type', type || 'projects');
                  localStorage.setItem('searchTerm', q || '');
                  localStorage.setItem('navigateToSearch', 'true');
                  const body = {
                    filter: checkSearchFilters(type || 'projects', JSON.parse(localStorage.getItem('filter') || '{}')),
                    type,
                    q,
                  };
                  // if (q?.trim()) {
                  //   Object.assign(body, { q: q });
                  // }
                  const requests = [searchReq(body, { limit: 10, page }), jobCategoriesReq()];
                  const [searchData, jobCategories] = await Promise.all(requests);
                  return { searchData, jobCategories };
                },
              },
            ],
          },
          {
            path: 'settings',
            async lazy() {
              const { Setting } = await import('src/pages/setting/index');
              return {
                Component: Setting,
              };
            },
          },

          {
            path: 'connections/*',
            loader: async () => {
              const connections = await getConnections({ page: 1, limit: 10, 'filter.status': 'CONNECTED' });
              return { connections };
            },
            async lazy() {
              const { Connctions } = await import('src/pages/connections');
              return {
                Component: Protect(Connctions, 'both'),
              };
            },
          },
          {
            path: 'dashboard',
            children: [
              {
                path: 'user',
                loader: async () => {
                  const [profileData, impactPointHistory] = await Promise.all([profile(), impactPoints()]);
                  return { profileData, impactPointHistory };
                },
                async lazy() {
                  const { Dashboard } = await import('src/pages/dashboard');
                  return {
                    Component: Protect(Dashboard, 'users'),
                  };
                },
              },
              {
                path: ':id/org',
                loader: async ({ params }) => {
                  if (params.id) {
                    const [profileData, impactPointHistory] = await Promise.all([
                      getOrganizationByShortName(params.id),
                      impactPoints(),
                    ]);
                    return { profileData, impactPointHistory };
                  }
                },
                async lazy() {
                  const { Dashboard } = await import('src/pages/dashboard');
                  return {
                    Component: Protect(Dashboard, 'organizations'),
                  };
                },
              },
            ],
          },
          {
            path: 'refer',
            async lazy() {
              const { Refer } = await import('src/pages/refer');
              return {
                Component: Protect(Refer, 'both'),
              };
            },
          },
          {
            path: '/:id/contribute',
            children: [
              {
                path: '',
                loader: async ({ params }) => {
                  if (params.id) {
                    const user = await otherProfileByUsername(params.id);
                    return {
                      user,
                    };
                  }
                },
                async lazy() {
                  const { Contribute } = await import('src/pages/contribute');
                  return {
                    Component: Protect(Contribute, 'users'),
                  };
                },
              },
              {
                path: 'center',
                loader: async () => {
                  const [jurorDisputes, jurorInvitations] = await Promise.all([
                    disputes({ limit: 10, page: 1, 'filter.direction': 'juror' }),
                    invitations({ limit: 10, page: 1 }),
                  ]);
                  return { jurorDisputes, jurorInvitations };
                },
                async lazy() {
                  const { ContributeCenter } = await import('src/pages/contribute/contributeCenter');
                  return {
                    Component: Protect(ContributeCenter, 'users'),
                  };
                },
              },
            ],
          },
          {
            path: 'feeds',
            loader: async () => await posts({ page: 1, limit: 10 }),
            async lazy() {
              const { Feeds } = await import('src/pages/feeds');
              return {
                Component: Protect(Feeds, 'both'),
              };
            },
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
            path: 'congrats',
            async lazy() {
              const { Congrats } = await import('src/pages/sign-up/congrats');
              return {
                Component: Congrats,
              };
            },
          },
          {
            path: 'notification',
            async lazy() {
              const { AllowNotification } = await import('src/pages/sign-up/allowNotification');
              return {
                Component: AllowNotification,
              };
            },
          },
          {
            path: 'onboarding',
            async lazy() {
              const { Onboarding } = await import('src/pages/sign-up/onboarding');
              return {
                Component: Onboarding,
              };
            },
          },
        ],
      },
    ],
  },
  {
    path: 'notifications/:id',
    loader: ({ params }) => {
      return {
        notificationId: params.id,
      };
    },
    async lazy() {
      const { NotificationDeepLink } = await import('src/pages/notificationDeepLink');
      return {
        Component: NotificationDeepLink,
      };
    },
  },
  {
    path: '/intro',
    async lazy() {
      const { Intro } = await import('src/pages/intro');
      return {
        Component: Intro,
      };
    },
  },
  {
    path: '/oauth',
    children: [
      {
        path: 'socious',
        async lazy() {
          const { SociousID } = await import('src/pages/oauth/socious');
          return { Component: SociousID };
        },
      },
    ],
  },
  {
    path: '/referral',
    async lazy() {
      const { Referral } = await import('src/pages/refer/referral');
      return { Component: Referral };
    },
  },
  {
    path: 'privacy-policy',
    async lazy() {
      const { PrivacyPolicy } = await import('src/pages/privacyPolicy/privacyPolicy');
      return {
        Component: PrivacyPolicy,
      };
    },
  },
  {
    path: 'terms-conditions',
    async lazy() {
      const { TermsConditions } = await import('src/pages/termsConditions/termsConditions');
      return {
        Component: TermsConditions,
      };
    },
  },
  {
    path: '*',
    element: <div>{translate('router-not-found')}</div>,
  },
];

function Protect<T extends object>(Component: ComponentType<T>, allowedIdentity: string): ComponentType<T> {
  return function ProtectedRoute(props: T) {
    const { status, entities } = useSelector((state: RootState) => state.identity);
    const current = entities.find(identity => identity.current)?.type;
    // TODO: We may notify user before redirect to intro page
    if (status === 'loading') return <div></div>;
    if (status === 'failed') return <Navigate to="/intro" />;
    if (allowedIdentity === current || allowedIdentity === 'both') {
      return <Component {...props} />;
    } else return <Navigate to="/jobs" />;
  };
}

function DefaultRoute() {
  const status = useSelector((state: RootState) => state.identity.status);
  const current = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(item => item.current),
  );

  if (status === 'succeeded')
    return (
      <Navigate
        to={current?.type === 'users' ? '/dashboard/user' : `/dashboard/${(current?.meta as OrgMeta).shortname}/org`}
      />
    );

  if (status === 'loading') return <div></div>;
  if (status === 'failed') return <Navigate to="/intro" />;

  return <Navigate to="/jobs" />;
}

function ErrorBoundary() {
  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/intro" />;
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);

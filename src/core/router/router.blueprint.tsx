import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
import {
  jobs,
  chats,
  stripeProfile,
  jobCategories as jobCategoriesReq,
  jobQuestions,
  userPaidMissions,
  profile,
  job,
  getMission,
  otherProfileByUsername,
  badges,
  impactPoints,
  getOrganizationByShortName,
  getRequestedVerifyExperiences,
  userApplicants,
} from 'src/core/api';
import { search as searchReq } from 'src/core/api/site/site.api';
import { Layout as NowruzLayout } from 'src/Nowruz/modules/layout';
import FallBack from 'src/Nowruz/pages/fallback/fallback';
import store, { RootState } from 'src/store';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
  {
    path: 'captcha',
    async lazy() {
      const { Captcha } = await import('src/Nowruz/pages/captcha');
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
                      const user = await otherProfileByUsername(params.id!);
                      // Keep this, it might be needed in the future
                      // const [userBadges, missions] = await Promise.all([badges(user.id), userMissions(user.id)]);
                      return {
                        user,
                        // badges: userBadges,
                        // missions,
                      };
                    },
                    async lazy() {
                      const { UserProifle } = await import('src/Nowruz/pages/userProfile');
                      return {
                        Component: UserProifle,
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
                      const { Impact } = await import('src/Nowruz/pages/impact');
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
                      const organization = await getOrganizationByShortName(params.id!);
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
                    },
                    async lazy() {
                      const { OrgProfile } = await import('src/Nowruz/pages/orgProfile');
                      return {
                        Component: OrgProfile,
                      };
                    },
                  },
                  {
                    path: 'jobs',

                    loader: async ({ params }) => {
                      const organization = await getOrganizationByShortName(params.id!);
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
                    },
                    async lazy() {
                      const { OrgProfile } = await import('src/Nowruz/pages/orgProfile');
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
              return {
                credentials: await getRequestedVerifyExperiences({ page: 1, limit: 10 }),
              };
            },
            async lazy() {
              const { Credentials } = await import('src/Nowruz/pages/Credentials');
              return {
                Component: Credentials,
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
                  const { CreateJob } = await import('src/Nowruz/pages/jobs/Create');
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
                  const { EditJob } = await import('src/Nowruz/pages/jobs/Edit');
                  return {
                    Component: EditJob,
                  };
                },
              },
              {
                path: 'created',
                loader: async () => {
                  const page = Number(localStorage.getItem('page') || 1);
                  const data = await jobs({ page: page, status: 'ACTIVE', limit: 5 });
                  return data;
                },
                async lazy() {
                  const { CreatedList } = await import('src/Nowruz/pages/jobs/Created');
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
                  const { CreatedDetail } = await import('src/Nowruz/pages/jobs/detail/Created');
                  return {
                    Component: Protect(CreatedDetail, 'organizations'),
                  };
                },
              },
              {
                path: '',
                loader: async () => {
                  const page = Number(localStorage.getItem('page') || 1);
                  const data = await jobs({ page, status: 'ACTIVE', limit: 10 });
                  return data;
                },
                async lazy() {
                  const { JobsList } = await import('src/Nowruz/pages/jobs/List');
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
                  const { JobDetail } = await import('src/Nowruz/pages/jobs/detail');
                  return { Component: JobDetail };
                },
              },
              {
                path: 'applied',
                // loader: async () => {
                //   localStorage.setItem('source', 'applied');
                //   localStorage.removeItem('navigateToSearch');
                //   //const data = await userApplicants({ status: 'PENDING', page: page, limit: 10 });
                //   //return data;
                // },
                async lazy() {
                  const { AppliedList } = await import('src/Nowruz/pages/jobs/Applied');
                  return {
                    Component: Protect(AppliedList, 'users'),
                  };
                },
              },
            ],
          },
          {
            path: 'contracts',
            async lazy() {
              const { Contracts } = await import('src/Nowruz/pages/contracts');
              return {
                Component: Protect(Contracts, 'both'),
              };
            },
          },
          {
            path: 'payments',
            children: [
              {
                path: '',
                loader: async () => {
                  const requests = [
                    userPaidMissions({ page: 1, 'filter.p.payment_type': 'PAID', 'filter.status': 'CONFIRMED' }),
                    stripeProfile({}),
                    stripeProfile({ is_jp: true }),
                  ];
                  const [missionsList, stripeProfileRes, jpStripeProfileRes] = await Promise.all(requests);
                  return { missionsList, stripeProfileRes, jpStripeProfileRes };
                },
                async lazy() {
                  const { Wallet } = await import('src/Nowruz/pages/wallet');
                  return {
                    Component: Protect(Wallet, 'both'),
                  };
                },
              },
              {
                path: ':id',
                loader: async ({ params }) => {
                  if (params.id) {
                    const mission = await getMission(params.id);
                    return { mission };
                  }
                },
                async lazy() {
                  const { TransactionDetails } = await import('src/Nowruz/pages/wallet/transactionDetails');
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
              const { Chats } = await import('src/Nowruz/pages/chats');
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
                  const { Search } = await import('src/Nowruz/pages/search');
                  return {
                    Component: Search,
                  };
                },
                loader: async ({ request }) => {
                  const page = Number(localStorage.getItem('searchPage')) || 1;

                  const url = new URL(request.url);
                  const q = url.searchParams.get('q');
                  const type = url.searchParams.get('type') ?? 'projects';
                  localStorage.setItem('type', type || 'projects');
                  localStorage.setItem('searchTerm', q || '');
                  localStorage.setItem('navigateToSearch', 'true');
                  const body = {
                    filter: {},
                    type,
                  };
                  if (q?.trim()) {
                    Object.assign(body, { q: q });
                  }
                  const data = await searchReq(body, { limit: 10, page });
                  return data;
                },
              },
            ],
          },
          {
            path: 'settings',
            async lazy() {
              const { Setting } = await import('src/Nowruz/pages/setting/index');
              return {
                Component: Setting,
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
            path: 'email',
            async lazy() {
              const { Email } = await import('src/Nowruz/pages/sign-up/Email');
              return {
                Component: Email,
              };
            },
          },
          {
            path: 'verification',
            async lazy() {
              const { Verify } = await import('src/Nowruz/pages/sign-up/Verify');
              return {
                Component: Verify,
              };
            },
          },
          {
            path: 'password',
            async lazy() {
              const { ChoosePassword } = await import('src/Nowruz/pages/sign-up/ChoosePassword');
              return {
                Component: ChoosePassword,
              };
            },
          },
          {
            path: 'complete',
            loader: async () => {
              const currentProfile = await profile();
              return {
                currentProfile,
              };
            },
            async lazy() {
              const { Details } = await import('src/Nowruz/pages/sign-up/Details');
              return {
                Component: Details,
              };
            },
          },
          {
            path: 'congrats',
            async lazy() {
              const { Congrats } = await import('src/Nowruz/pages/sign-up/Congrats');
              return {
                Component: Congrats,
              };
            },
          },
          // {
          //   path: 'welcome',
          //   async lazy() {
          //     const { Welcome } = await import('src/pages/sign-up/welcome/welcome');
          //     return {
          //       Component: Welcome,
          //     };
          //   },
          // },
          {
            path: 'notification',
            async lazy() {
              const { AllowNotification } = await import('src/Nowruz/pages/AllowNotification');
              return {
                Component: AllowNotification,
              };
            },
          },
          {
            path: 'onboarding',
            loader: async () => {
              await store.dispatch(currentIdentities());
              return null;
            },
            async lazy() {
              const { Onboarding } = await import('src/Nowruz/pages/sign-up/Onboarding');
              return {
                Component: Onboarding,
              };
            },
          },
          // {
          //   path: 'allow-notification',
          //   async lazy() {
          //     const { AllowNotification } = await import('src/pages/sign-up/AllowNotification');
          //     return {
          //       Component: AllowNotification,
          //     };
          //   },
          // },
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
          const { Email } = await import('src/Nowruz/pages/forget-password/email');
          return {
            Component: Email,
          };
        },
      },
      {
        path: 'otp/*',
        async lazy() {
          const { Otp } = await import('src/Nowruz/pages/forget-password/otp');
          return {
            Component: Otp,
          };
        },
      },
      {
        path: 'password/*',
        async lazy() {
          const { Password } = await import('src/Nowruz/pages/forget-password/password');
          return {
            Component: Password,
          };
        },
      },
      {
        path: 'reset-completed',
        async lazy() {
          const { ResetCompleted } = await import('src/Nowruz/pages/forget-password/resetCompleted');
          return {
            Component: ResetCompleted,
          };
        },
      },
    ],
  },
  // {
  //   path: 'change-password',
  //   async lazy() {
  //     const { ChangePasswordContainer } = await import('src/pages/change-password/change-password.container');
  //     return {
  //       Component: ChangePasswordContainer,
  //     };
  //   },
  // },
  // {
  //   path: 'delete-profile',
  //   children: [
  //     {
  //       path: 'delete',
  //       async lazy() {
  //         const { Delete } = await import('src/pages/delete-profile/delete/delete');
  //         return {
  //           Component: Delete,
  //         };
  //       },
  //     },
  //     {
  //       path: 'password',
  //       async lazy() {
  //         const { Password } = await import('src/pages/delete-profile/password/password');
  //         return {
  //           Component: Password,
  //         };
  //       },
  //     },
  //     {
  //       path: 'confirm',
  //       async lazy() {
  //         const { Confirm } = await import('src/pages/delete-profile/confirm/confirm');
  //         return {
  //           Component: Confirm,
  //         };
  //       },
  //     },
  //   ],
  // },
  {
    path: '/intro',
    async lazy() {
      const { Intro } = await import('src/Nowruz/pages/Intro');
      return {
        Component: Intro,
      };
    },
  },
  {
    path: '/sign-in',
    async lazy() {
      const { SignIn } = await import('src/Nowruz/pages/sign-in');
      return {
        Component: SignIn,
      };
    },
  },
  {
    path: '/oauth',
    children: [
      {
        path: 'google',
        async lazy() {
          const { GoogleOauth2 } = await import('src/Nowruz/pages/oauth/google');
          return {
            Component: GoogleOauth2,
          };
        },
      },
    ],
  },
  {
    path: 'privacy-policy',
    async lazy() {
      const { PrivacyPolicy } = await import('src/Nowruz/pages/privacyPolicy/privacyPolicy');
      return {
        Component: PrivacyPolicy,
      };
    },
  },
  {
    path: 'terms-conditions',
    async lazy() {
      const { TermsConditions } = await import('src/Nowruz/pages/termsConditions/termsConditions');
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

function Protect<T extends {}>(Component: ComponentType<T>, allowedIdentity: string): ComponentType<T> {
  return function ProtectedRoute(props: T) {
    const { status, entities } = useSelector((state: RootState) => state.identity);
    const current = entities.find((identity) => identity.current)?.type;
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
  if (status === 'succeeded') return <Navigate to="/jobs" />;

  if (status === 'loading') return <div></div>;
  if (status === 'failed') return <Navigate to="/intro" />;

  return <Navigate to="/jobs" />;
}

function ErrorBoundary() {
  const flag = 'refreshed';
  const refreshed = localStorage.getItem(flag);

  if (!refreshed) {
    localStorage.setItem(flag, 'true');
    window.location.reload();
    return <></>;
  }

  localStorage.removeItem(flag);

  const error: any = useRouteError();
  if (error?.response?.status === 401) return <Navigate to="/intro" />;
  console.log(error);
  return <FallBack />;
}

export const routes = createBrowserRouter(blueprint);

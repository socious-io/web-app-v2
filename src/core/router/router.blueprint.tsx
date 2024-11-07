import { ComponentType } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, RouteObject, createBrowserRouter, useRouteError } from 'react-router-dom';
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
} from 'src/core/api';
import { events, search as searchReq } from 'src/core/api/site/site.api';
import { Layout as NowruzLayout } from 'src/modules/layout';
import FallBack from 'src/pages/fallback/fallback';
import store, { RootState } from 'src/store';
import { currentIdentities } from 'src/store/thunks/identity.thunks';

import { checkSearchFilters } from '../utils';

export const blueprint: RouteObject[] = [
  { path: '/', element: <DefaultRoute /> },
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
                        // Keep this, it might be needed in the future
                        // const [userBadges, missions] = await Promise.all([badges(user.id), userMissions(user.id)]);
                        return {
                          user,
                          // badges: userBadges,
                          // missions,
                        };
                      }
                    },
                    async lazy() {
                      const { UserProifle } = await import('src/pages/userProfile');
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
                    | 'organizations';

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
            path: 'referral',
            async lazy() {
              const { Refer } = await import('src/pages/refer');
              return {
                Component: Protect(Refer, 'users'),
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
            path: 'email',
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const eventName = url.searchParams.get('event_name');
              if (eventName) {
                return await events({ limit: 10, page: 1 });
              } else {
                return null;
              }
            },
            async lazy() {
              const { Email } = await import('src/pages/sign-up/Email');
              return {
                Component: Email,
              };
            },
          },
          {
            path: 'verification',
            async lazy() {
              const { Verify } = await import('src/pages/sign-up/Verify');
              return {
                Component: Verify,
              };
            },
          },
          {
            path: 'password',
            async lazy() {
              const { ChoosePassword } = await import('src/pages/sign-up/ChoosePassword');
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
              const { Details } = await import('src/pages/sign-up/Details');
              return {
                Component: Details,
              };
            },
          },
          {
            path: 'congrats',
            async lazy() {
              const { Congrats } = await import('src/pages/sign-up/Congrats');
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
              const { AllowNotification } = await import('src/pages/AllowNotification');
              return {
                Component: AllowNotification,
              };
            },
          },
          {
            path: 'onboarding',
            // loader: async () => {
            //   await store.dispatch(currentIdentities());
            //   return null;
            // },
            async lazy() {
              const { Onboarding } = await import('src/pages/sign-up/Onboarding');
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
    path: 'referral',
    children: [
      {
        path: ':username/talent',
        loader: async ({ params }) => {
          if (params.username) {
            localStorage.setItem('registerFor', 'user');
            const user = await otherProfileByUsername(params.username);
            localStorage.setItem(
              'referrer',
              JSON.stringify({ fisrtName: user.first_name, avatarUrl: user.avatar?.url, id: user.id }),
            );
            return null;
          }
        },
        element: <Navigate to="/sign-up/user/email" />,
      },
      {
        path: ':username/org',
        loader: async ({ params }) => {
          if (params.username) {
            localStorage.setItem('registerFor', 'organization');
            const user = await otherProfileByUsername(params.username);
            localStorage.setItem(
              'referrer',
              JSON.stringify({ fisrtName: user.first_name, avatarUrl: user.avatar?.url, id: user.id }),
            );
            return null;
          }
        },
        element: <Navigate to="/sign-up/user/email" />,
      },
    ],
  },
  {
    path: 'forget-password',
    children: [
      {
        path: 'email',
        async lazy() {
          const { Email } = await import('src/pages/forget-password/email');
          return {
            Component: Email,
          };
        },
      },
      {
        path: 'otp/*',
        async lazy() {
          const { Otp } = await import('src/pages/forget-password/otp');
          return {
            Component: Otp,
          };
        },
      },
      {
        path: 'password/*',
        async lazy() {
          const { Password } = await import('src/pages/forget-password/password');
          return {
            Component: Password,
          };
        },
      },
      {
        path: 'reset-completed',
        async lazy() {
          const { ResetCompleted } = await import('src/pages/forget-password/resetCompleted');
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
      const { Intro } = await import('src/pages/Intro');
      return {
        Component: Intro,
      };
    },
  },
  {
    path: '/sign-in',
    loader: async ({ request }) => {
      const url = new URL(request.url);
      const eventName = url.searchParams.get('event_name');
      if (eventName) {
        return await events({ limit: 10, page: 1 });
      } else {
        return null;
      }
    },
    async lazy() {
      const { SignIn } = await import('src/pages/sign-in');
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
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const eventName = url.searchParams.get('event_name');
          if (eventName) {
            return await events({ limit: 10, page: 1 });
          } else {
            return null;
          }
        },
        async lazy() {
          const { GoogleOauth2 } = await import('src/pages/oauth/google');
          return {
            Component: GoogleOauth2,
          };
        },
      },
      {
        path: 'apple',
        loader: async ({ request }) => {
          const url = new URL(request.url);
          const eventName = url.searchParams.get('event_name');
          if (eventName) {
            return await events({ limit: 10, page: 1 });
          } else {
            return null;
          }
        },
        async lazy() {
          const { AppleOauth2 } = await import('src/pages/oauth/apple');
          return {
            Component: AppleOauth2,
          };
        },
      },
    ],
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
    path: '/mesh',
    async lazy() {
      const { PageMesh } = await import('src/pages/mesh');
      return {
        Component: PageMesh,
      };
    },
  },
  {
    path: '*',
    element: <div>Page not found :(</div>,
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

import { RouteObject, createBrowserRouter } from 'react-router-dom';
import Layout from 'src/components/templates/refactored/layout/layout';
import { jobs } from 'src/core/api';
import { getFeedList } from 'src/pages/feed/refactored/feed.service';
import { getComments, getPostDetail } from 'src/pages/feed/refactored/feedDetails/feedDetail.service';
import { jobsPageLoader } from 'src/pages/jobs/jobs.loader';

export const blueprint: RouteObject[] = [
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
    children: [
      {
        path: 'feeds',
        async lazy() {
          const { Feeds } = await import('../../pages/feed/refactored/feed');
          return {
            Component: Feeds,
          };
        },
        loader: () => getFeedList({ page: 1 }),
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
          const requests = [getPostDetail(params.id!), getComments(params.id!, 1)];
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
];

export const routes = createBrowserRouter(blueprint);

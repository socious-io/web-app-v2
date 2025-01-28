import { Logo } from 'public/icons/dynamic/logo';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, useLoaderData, useSearchParams } from 'react-router-dom';
import { EVENTS_QUERIES } from 'src/constants/EVENTS_QUERIES';
import { EventsRes } from 'src/core/api';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { SignInForm } from 'src/modules/Auth/containers/signin/SignInForm';
import TechSummit from 'src/modules/Events/TechSummit';
import { LanguageSwitcher } from 'src/modules/general/components/LanguageSwitcher';
import { RootState } from 'src/store';

export const SignIn = () => {
  const events = (useLoaderData() as EventsRes) || null;
  const [searchParams] = useSearchParams();
  const eventName = searchParams.get('event_name') || '';
  const { t: translate } = useTranslation();
  //TODO: remove this duplicate codes but works fine for now
  const status = useSelector((state: RootState) => state.identity.status);
  if (status === 'loading') return <div></div>;
  if (status === 'succeeded') return <Navigate to="/jobs" />;

  const eventId = events?.items.find(event => event.title === EVENTS_QUERIES[eventName])?.id || '';
  const defaultIntro = {
    title: translate('login-title'),
    description: translate('login-subtitle'),
  };
  const intro = {
    tech4impact: {
      title: translate('login-tech-title'),
      description: translate('login-tech-subtitle'),
      component: <TechSummit />,
    },
  };

  return (
    <div className="relative h-screen">
      <div className="flex flex-col md:flex-row items-center h-full">
        <div className="flex-1 ">
          <div className={`pt-12 px-4 md:pt-24 form-container`}>
            <IntroHeader
              title={intro[eventName]?.title || defaultIntro.title}
              description={intro[eventName]?.description || defaultIntro.description}
              logo={<Logo width={48} height={48} />}
            />
            <SignInForm event={{ id: eventId, name: eventName }} />
          </div>
        </div>
        <div className="md:absolute md:top-8 md:left-8 md:transform-none flex justify-center">
          <LanguageSwitcher />
        </div>
        {intro[eventName]?.component}
      </div>
    </div>
  );
};

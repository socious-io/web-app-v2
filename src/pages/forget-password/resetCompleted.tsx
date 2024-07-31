import { useNavigate } from 'react-router-dom';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { BackLink } from 'src/modules/general/components/BackLink';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';

export const ResetCompleted = () => {
  const navigate = useNavigate();
  const eventName = localStorage.getItem('event_name') || '';
  const navigateToLogin = () => {
    localStorage.removeItem('event_name');
    navigate(`/sign-in${eventName && `?event_name=${eventName}`}`);
  };

  return (
    <div className={`pt-12 px-4 space-y-8 md:pt-24  form-container`}>
      <IntroHeader
        title="Password reset"
        description="Your password has been successfully reset. Click below to log in magically."
        logo={<FeaturedIcon src="/icons/check-circle.svg" />}
      />
      <Button color="primary" onClick={navigateToLogin} fullWidth>
        Continue
      </Button>
      {/* <BackLink title="Back to log in" onBack={navigateToLogin} variant="subtitle2" textAlign="center" /> */}
    </div>
  );
};

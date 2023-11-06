import { useNavigate } from 'react-router-dom';
import { IntroHeader } from 'src/Nowruz/modules/Auth/components/IntroHeader';
import { BackLink } from 'src/Nowruz/modules/general/components/BackLink';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';

export const Succeed = () => {
  const navigate = useNavigate();
  const navigateToJobs = () => {
    navigate('../../jobs');
  };
  const onBack = () => {
    navigate('/sign-in');
  };
  return (
    <div className={`pt-12 px-4 space-y-8 md:pt-24  form-container`}>
      <IntroHeader
        title="Password reset"
        description="Your password has been successfully reset. Click below to log in magically."
        logo={<FeaturedIcon src="/icons/check-circle.svg" />}
      />
      <Button color="primary" onClick={navigateToJobs} fullWidth>
        Continue
      </Button>
      <BackLink title="Back to log in" onBack={onBack} variant="subtitle2" textAlign="center" />
    </div>
  );
};

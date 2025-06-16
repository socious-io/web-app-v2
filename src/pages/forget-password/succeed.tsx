import { useNavigate } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { IntroHeader } from 'src/modules/Auth/components/IntroHeader';
import { BackLink } from 'src/modules/general/components/BackLink';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import variables from 'src/styles/constants/_exports.module.scss';
export const Succeed = () => {
  const navigate = useNavigate();
  const navigateToJobs = () => {
    navigate('../../jobs');
  };
  const onBack = () => {
    navigate('/intro');
  };
  return (
    <div className={`pt-12 px-4 space-y-8 md:pt-24  form-container`}>
      <IntroHeader
        title="Password reset"
        description="Your password has been successfully reset. Click below to log in magically."
        logo={<FeaturedIcon iconName="check-circle" iconColor={variables.color_grey_700} />}
      />
      <Button color="primary" onClick={navigateToJobs} fullWidth>
        {translate('general-success-continue')}
      </Button>
      <BackLink title="Back to log in" onBack={onBack} variant="subtitle2" textAlign="center" />
    </div>
  );
};

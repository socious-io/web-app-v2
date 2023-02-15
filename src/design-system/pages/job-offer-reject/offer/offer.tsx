import css from './offer.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Header } from '../../../atoms/header/header';
import { Resolver } from './offer.types';
import { Input } from '../../../atoms/input/input';
import { Dropdown } from '../../../atoms/dropdown/dropdown';
import { Textarea } from '../../../atoms/textarea/textarea';
import { Button } from '../../../atoms/button/button';
import { PROJECT_PAYMENT_TYPE_DROPDOWN } from '../../../../core/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_PAYMENT_SCHEME_DROPDOWN } from '../../../../core/constants/PROJECT_PAYMENT_SCHEME';

export const Offer = (): JSX.Element => {
  const navigate = useNavigate();
  const { applicantDetail } = useMatch().ownData as Resolver;

  function navigateToOverview() {
    navigate({ to: '..' });
  }

  return (
    <div className={css.container}>
      <Header
        onBack={navigateToOverview}
        paddingTop="var(--safe-area)"
        title={applicantDetail.user.name}
      />
      <div className={css.sentTo}>An offer will be sent to {applicantDetail.user.name}.</div>
      <div className={css.form}>
        <Dropdown label="Payment type" list={PROJECT_PAYMENT_TYPE_DROPDOWN} placeholder="payment type" />
        <Dropdown label="Payment mode" list={PROJECT_PAYMENT_SCHEME_DROPDOWN} placeholder="payment mode" />
        <Input optional variant="outline" label="Estimated total hours" placeholder="hrs" />
        <Textarea variant="outline" label="Message" placeholder="Write message" />
      </div>
      <div className={css.btnContainer}>
        <Button>send offer</Button>
      </div>
    </div>
  );
};

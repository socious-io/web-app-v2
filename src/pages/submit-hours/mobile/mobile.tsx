import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import { Header } from 'src/components/atoms/header/header';
import { Typography } from 'src/components/atoms/typography/typography';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Divider } from 'src/components/templates/divider/divider';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { printWhen } from 'src/core/utils';
import { useSubmittedHoursShared } from '../submit-hours.shared';
import css from './mobile.module.scss';
import {Card} from "../../../components/atoms/card/card";
import {Input} from "../../../components/atoms/input/input";

export const Mobile = (): JSX.Element => {
  const { offer, media, status, onCompleteMission, onStopMission,onCancel,form } = useSubmittedHoursShared();

  const offeredMessageBoxJSX = (
    <div className={css.congratulations}>
      <img src="/icons/tick-white-simple.svg" />
      <div>
        <div className={css.congratulationsText}>Your job has been confirmed.</div>
        <div className={css.congratulationsText}>
          Once you have finished your work please click on “complete job” button.
        </div>
      </div>
    </div>
  );

  const acceptedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You marked this job as completed.</div>
        <div className={css.congratulationsText}>
          You will get your payment once <span className={css.companyName}>{offer.offerer.meta.name}</span> confirms
          your assignment.
        </div>
      </div>
    </div>
  );

  const stoppedMessageBoxJSX = (
    <div className={css.acceptedMessageBox}>
      <img src="/icons/mail-inbox-envelope-check-black.svg" />
      <div>
        <div className={css.congratulationsText}>You marked this job as stopped.</div>
        {/* <div className={css.congratulationsText}>
            You have already withdrawn the offer from <span className={css.companyName}>{offer.offerer.meta.name}</span>.
          </div> */}
      </div>
    </div>
  );
  const hourlyButtonsJSX = (
    <div className={css.btnContainer}>
      <Button onClick={onCompleteMission}>Submit Hours</Button>
      <Button onClick={onCancel} color="white">
        Cancel
      </Button>
    </div>
  );
  return (
    <TopFixedMobile>
      <Header title="Submit hours" onBack={() => history.back()} />
      <div className={css.body}>
        <div className={css.jobInfoContainer}>
          <Card>
          <div className={css.jobTitle}>{offer.project.title}</div>
          <ProfileView
              img={offer.offerer.meta.image}
              type={offer.offerer.type}
              name={offer.offerer.meta.name}
              username={offer.offerer.meta.shortname}
              location={`${offer.offerer.meta.city}, ${offer.offerer.meta.country}`}
          />
            <div className={css.agreement}>
              <span className={css.title}>Agreement : </span>
              <span className={css.subtitle}>Max {offer.total_hours} hrs / week</span>
            </div>
          </Card>
          <Card className={css.card}>
            <Input className={css.input} register={form} name="submit_hours" placeholder="10:00" label="Input hours" />
          </Card>
        </div>
          {printWhen(hourlyButtonsJSX,true)}
      </div>
    </TopFixedMobile>
  );
};

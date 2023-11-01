import Dapp from 'src/dapp';

import css from './applicant-list-pay.module.scss';
import { Applicant, ApplicantListPayProps } from './applicant-list-pay.types';
import { printWhen } from '../../../core/utils';
import { StatusTag } from '../../atoms/status-tag/status-tag';
import { ProfileView } from '../profile-view/profile-view';

const statuses = {
  CONFIRMED: {
    label: 'Confirmed',
    color: 'green',
  },
  COMPLETE: {
    label: 'Awaiting confirmation',
    color: 'orange',
  },
  CLOSED: {
    label: 'Closed',
    color: 'unspecified',
  },
};

export const ApplicantListPay = (props: ApplicantListPayProps): JSX.Element => {
  const confirmBtn = (id: string, escrowId?: string) => (
    <div onClick={() => props.onConfirm?.(id, escrowId)} className={css.footerItem}>
      <img src="/icons/user-accept-blue.svg" />
      <div className={css.footerLabel}>Confirm</div>
    </div>
  );

  const feedbackBtn = (id: string, status: string) => (
    <div onClick={() => props.onFeedback?.(id, status)} className={css.footerItem}>
      <img src="/icons/user-accept-blue.svg" />
      <div className={css.footerLabel}>Give feedback</div>
    </div>
  );

  const reHireBtn = (applicant: Applicant) => (
    <div
      onClick={() => {
        props.onRehire && props.onRehire(applicant.id);
      }}
      className={css.footerItem}
    >
      <img src="/icons/rehire.svg" width={'25px'} />
      <div className={css.footerLabel}>Hire again</div>
    </div>
  );

  const applicantJSX = (applicant: Applicant) => {
    return (
      <div key={applicant.id} className={css.applicantContainer}>
        <ProfileView
          name={applicant.name}
          username={applicant?.username}
          location={applicant.category}
          img={applicant.image}
          type="users"
        />
        <div className={css.statusContainer}>
          <div className={css.hireDate}>{applicant.hireDate}</div>
          <div className={css.status}>
            <StatusTag {...statuses[applicant.status]} />
          </div>
        </div>
        <div className={css.box}>
          <div className={css.header}>
            <div className={css.typeItem}>
              <img src="/icons/time.svg" />
              {applicant.paymentType} - {applicant.paymentMode}
            </div>
            <div className={css.typeItem}>
              <img src="/icons/suitcase.svg" />
              {applicant.totalHour} hrs
            </div>
          </div>
          {/* <div className={css.totalMission}>
            <div>Total mission</div>
            <div className={css.totalMissionValue}>{applicant.totalMission}</div>
          </div> */}
        </div>
        <div className={css.applicantFooter}>
          {printWhen(
            <div className={css.footerItem}>
              <Dapp.Connect />
            </div>,
            (props.isPaidCrypto || applicant.payment?.service == 'CRYPTO') && props.confirmable || applicant.status === 'COMPLETE',
          )}
          {printWhen(
            confirmBtn(applicant.id, applicant.payment?.meta?.id),
            props.confirmable || applicant.status === 'COMPLETE',
          )}
          {printWhen(
            feedbackBtn(applicant.id, applicant.status),
            applicant.showFeedback && !!props?.onFeedback && applicant?.user_feedback === null,
          )}
          {printWhen(reHireBtn(applicant), props.onRehire !== undefined)}
          <div className={css.footerItem} onClick={() => props.onMessageClick?.(applicant.user_id)}>
            <img src="/icons/message-blue.svg" />
            <div className={css.footerLabel}>Message</div>
          </div>
        </div>
      </div>
    );
  };

  return <div className={css.container}>{props.list.map((item) => applicantJSX(item))}</div>;
};

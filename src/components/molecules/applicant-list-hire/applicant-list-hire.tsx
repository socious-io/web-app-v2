import { StatusTag } from 'src/components/atoms/status-tag/status-tag';
import { printWhen } from '../../../core/utils';
import { ChatBox } from '../../atoms/chat-box/chat-box';
import { Typography } from '../../atoms/typography/typography';
import { ProfileView } from '../profile-view/profile-view';
import css from './applicant-list-hire.module.scss';
import { Applicant, ApplicantListProps } from './applicant-list-hire.types';

export const ApplicantListHire = (props: ApplicantListProps): JSX.Element => {
  const hireBtn = (id: string) => (
    <div onClick={() => props.onHireClick?.(id)} className={css.footerItem}>
      <img src="/icons/user-accept-blue.svg" />
      <div className={css.footerLabel}>Hire</div>
    </div>
  );

  const rejectBtn = (id: string) => (
    <div onClick={() => props.onRejectClick?.(id)} className={css.footerItem}>
      <img src="/icons/user-reject-blue.svg" />
      <div className={css.footerLabel}>Reject</div>
    </div>
  );

  const applicantJSX = (applicant: Applicant) => {
    return (
      <div key={applicant.id} className={css.applicantContainer}>
        <ProfileView name={applicant.name} img={applicant.image} type="users" />
        <div className={css.detail}>
          <div className={css.applyDate}>{applicant.applyDate}</div>
          {props.required_payment && (
            <StatusTag color="red" label="Payment required" />
          )}
        </div>
        <ChatBox
          onClick={() => props.onApplicantClick?.(applicant.id)}
          type="receiver"
        >
          <Typography lineLimit={3}>{applicant.coverLetter}</Typography>
        </ChatBox>
        <div className={css.applicantFooter}>
          <>
            {printWhen(hireBtn(applicant.id), props.hireable)}
            {printWhen(rejectBtn(applicant.id), props.hireable)}
            <div className={css.footerItem}>
              <img src="/icons/message-blue.svg" />
              <div className={css.footerLabel}>Message</div>
            </div>
          </>
        </div>
      </div>
    );
  };

  return <div className={css.container}>{props.list.map((item) => applicantJSX(item))}</div>;
};

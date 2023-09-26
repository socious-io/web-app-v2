import css from './applicant-list.module.scss';
import { Applicant, ApplicantListProps } from './applicant-list.types';
import { printWhen } from '../../../core/utils';
import { ChatBox } from '../../atoms/chat-box/chat-box';
import { Typography } from '../../atoms/typography/typography';
import { ProfileView } from '../profile-view/profile-view';

export const ApplicantList = (props: ApplicantListProps): JSX.Element => {
  const hireBtn = (id: string) => (
    <div onClick={() => props.onOfferClick?.(id)} className={css.footerItem}>
      <img src="/icons/user-accept-blue.svg" />
      <div className={css.footerLabel}>Offer</div>
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
        <ProfileView name={applicant.name} username={applicant?.username} img={applicant.image} type="users" />
        <div className={css.applyDate}>{applicant.applyDate}</div>
        <ChatBox onClick={() => props.onApplicantClick?.(applicant.id)} type="receiver">
          <Typography lineLimit={3}>{applicant.coverLetter}</Typography>
        </ChatBox>
        <div className={css.applicantFooter}>
          <>
            {printWhen(hireBtn(applicant.id), props.hireable)}
            {printWhen(rejectBtn(applicant.id), props.hireable)}
            <div className={css.footerItem} onClick={() => props.onMessageClick?.(applicant.user_id)}>
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

import css from './applicant-info.module.scss';
import { ProfileView } from '@molecules/profile-view/profile-view';
import { ApplicantInfoProps } from './applicant-info.types';
import { ExpandableText } from '@atoms/expandable-text';

export const ApplicantInfo = (props: ApplicantInfoProps): JSX.Element => {
  return (
    <div className={css.container}>
      <ProfileView type="users" name={props.name} img={props.avatar} />
      <ExpandableText text={props.bio || ''} />
    </div>
  );
};

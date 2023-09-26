import { ExpandableText } from 'src/components/atoms/expandable-text';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';

import css from './applicant-info.module.scss';
import { ApplicantInfoProps } from './applicant-info.types';


export const ApplicantInfo = (props: ApplicantInfoProps): JSX.Element => {
  return (
    <div className={css.container}>
      <ProfileView type="users" name={props.name} img={props.avatar} />
      <ExpandableText text={props.bio || ''} />
    </div>
  );
};

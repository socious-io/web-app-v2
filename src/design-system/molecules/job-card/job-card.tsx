import { ProfileView } from '../profile-view/profile-view';
import css from './job-card.module.scss';
import { JobCardProps } from './job-card.types';

export const JobCard = (props: JobCardProps): JSX.Element => {
  const mainContent = () => {
    if (props.img) {
      return <ProfileView size="2rem" img={props.img} type={'users'} name={props.body} />;
    } else {
      return props.body;
    }
  };

  return (
    <div className={css.container}>
      <div className={css.title}>{props.title}</div>
      <div className={css.body}>{mainContent()}</div>
      <div className={css.date}>{props.date}</div>
    </div>
  );
};

import css from './job-card.module.scss';
import { JobCardProps } from './job-card.types';

export const JobCard = (props: JobCardProps): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.title}>{props.title}</div>
      <div className={css.body}>{props.body}</div>
      <div className={css.date}>{props.date}</div>
    </div>
  );
};

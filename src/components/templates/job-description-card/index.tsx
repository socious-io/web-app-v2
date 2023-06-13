import { Card } from 'src/components/atoms/card/card';
import { Categories } from 'src/components/atoms/categories/categories';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { JobDescriptionCardProps } from './job-description-card.types';
import css from './job-description-card.module.scss';

export const JobDescrioptionCard: React.FC<JobDescriptionCardProps> = ({
  job_title,
  start_date,
  end_date,
  img,
  type,
  name,
  username,
  location,
  info_list,
  containerClassName = '',
}) => {
  const createList = info_list.map((info) => (
    <div className={css['job__info']} key={info.name}>
      <img src={`/icons/${info.icon}.svg`} />
      {info.name}
    </div>
  ));

  return (
    <Card className={`${css['job']} ${containerClassName}`}>
      <span className={css['job__title']}>{job_title}</span>
      <div className={css['job__profile']}>
        <ProfileView img={img} type={type} name={name} username={username} location={location} />
      </div>
      <div>
        {start_date} - {end_date}
      </div>
      <div className={css['job__footer']}>
        <Categories list={createList} />
      </div>
    </Card>
  );
};

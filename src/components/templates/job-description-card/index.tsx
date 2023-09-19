import { Card } from 'src/components/atoms/card/card';
import { Categories } from 'src/components/atoms/categories/categories';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { JobDescriptionCardProps } from './job-description-card.types';
import css from './job-description-card.module.scss';
import { printWhen } from 'src/core/utils';

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
  total_mission,
  unit = 'USDC',
  containerClassName = '',
  payment_scheme = '',
}) => {
  const createList = info_list.map((info) => (
    <div className={css.job__info} key={info.name}>
      <img className={css.icon} src={`/icons/${info.icon}.svg`} />
      {info.name}
    </div>
  ));
  const HourlyJSX = () => (
    <div className={css.job__total}>
      Paid - Hourly rate
      <div className={css.job__price}>
        <span>{total_mission.toLocaleString()}</span>
        {unit}
      </div>
    </div>
  );
  const FixedJSX = () => (
    <div className={css.job__total}>
      Total mission
      <div className={css.job__price}>
        <span>{total_mission.toLocaleString()}</span>
        {unit}
      </div>
    </div>
  );
  return (
    <Card className={`${css.job} ${containerClassName}`}>
      <span className={css.job__title}>{job_title}</span>
      <div className={css.job__profile}>
        <ProfileView img={img} type={type} name={name} username={username} location={location} />
      </div>
      <div className={css.job__period}>
        {start_date} - {end_date}
      </div>
      <div className={css.job__footer}>
        <Categories list={createList} />
        {printWhen(FixedJSX(), payment_scheme === 'FIXED')}
        {printWhen(HourlyJSX(), payment_scheme.toUpperCase() === 'HOURLY')}
      </div>
    </Card>
  );
};

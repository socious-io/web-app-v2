import { Avatar } from 'src/components/atoms/avatar/avatar';
import css from './job-history-item.module.scss';
import { JobHistoryItemProps as Props } from './job-history-item.types';

export const JobHistoryItem = ({ data }: Props): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.left}>
        <div className={css.typeName}>{data.jobTitle}</div>
        <div className={css.organizationContainer}>
          <Avatar img={data.avatarUrl} type="organizations" />
          <div className={css.organizationName}>{data.organizationName}</div>
        </div>
        <div className={css.duration}>{data.dataStart} - {data.dataEnd}</div>
      </div>
      <div className={css.right}>
        <div className={css.date}>{data.date}</div>
        <div className={css.percent}>NA</div>
        <div className={css.total}>Total IS: {data.total}</div>
      </div>
    </div>
  );
};

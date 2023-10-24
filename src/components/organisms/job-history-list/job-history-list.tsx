import css from './job-history-list.module.scss';
import { JobHistoryListProps } from './job-history-list.types';
import { JobHistoryItem } from '../../molecules/job-history-item/job-history-item';

export const JobHistoryList = (props: JobHistoryListProps): JSX.Element => {
  const { data, ...rest } = props;

  return (
    <div style={rest}>
      {data.map((item) => {
        return (
          <div className={css.jobItem} key={item.date}>
            <JobHistoryItem {...item} />
          </div>
        );
      })}
    </div>
  );
};

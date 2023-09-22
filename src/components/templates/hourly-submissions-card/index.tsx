import { Card } from 'src/components/atoms/card/card';
import { HourlySubmissionsCardProps } from './job-description-card.types';
import css from './job-description-card.module.scss';
import { printWhen } from 'src/core/utils';
import { useState } from 'react';
import { formatDate } from 'src/core/time';

export const HourlySubmissionsCard: React.FC<HourlySubmissionsCardProps> = ({
  title,
  start_date,
  end_date,
  submissions,
}) => {
  const [displayedSubmissions, setDisplayedSubmissions] = useState(2);

  const displayMore = () => {
    const toDisplay = displayedSubmissions + 10;
    setDisplayedSubmissions(toDisplay);
  };

  return (
    <Card className={css.job}>
      <span className={css.job__title}>{title}</span>
      <div></div>
      <div className={css.job__footer}>
        <div className={css.job__period}>
          {start_date} - {end_date}
        </div>
        <div className={submissions?.length ? css.job__submissions : css.job__nosubmissions}>
          {printWhen(<div className={css.submissions__nosubmissions}>No submissions</div>, !submissions)}
          {submissions?.slice(0, displayedSubmissions).map((item: any) => (
            <div className={css.submissions} key={item.mission}>
              <div>
                {formatDate(item.start_at)} - {formatDate(item.end_at)}
              </div>
              <div className={css.submissions__hours_status}>
                <div>{item.total_hours} hours</div>
                <div>
                  {item.status === 'CONFIRMED' && (
                    <img className={css.submissions__icon} src={'/icons/confirmed-submit.svg'} alt="submitted" />
                  )}
                  {item.status === 'PENDING' && (
                    <img className={css.submissions__icon} src="/icons/waiting-submit.svg" alt="waiting" />
                  )}
                </div>
              </div>
            </div>
          ))}
          {printWhen(
            <div className={css.submissions__view_more} onClick={displayMore}>
              view more
            </div>,
            submissions?.length > displayedSubmissions
          )}
        </div>
      </div>
    </Card>
  );
};

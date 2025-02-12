import { Review } from 'src/core/adaptors';
import { toRelativeTime } from 'src/core/relative-time';
import { translate } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Chip } from 'src/modules/general/components/Chip';

import styles from './index.module.scss';

const ReviewCard: React.FC<Review> = ({ identity, date, review, job, isSatisfied }) => {
  return (
    <div className={styles['container']}>
      <div className={styles['avatar']}>
        <Avatar type={identity.type || 'organizations'} img={identity?.img || ''} />
        <div className={styles['avatar__info']}>
          <div className={styles['avatar__name']}>
            {identity.name}
            <span className={styles['review__date']}>{toRelativeTime(date)}</span>
          </div>
          <Chip
            theme="grey"
            size="sm"
            startIcon={<img src={`/icons/thumbs-${isSatisfied ? 'up' : 'down'}.svg`} />}
            label={translate(`cont-review-${isSatisfied ? 'satisfactory' : 'unsatisfactory'}`)}
          />
        </div>
      </div>
      <div className={styles['review__content']}>“{review}“</div>
      <div className={styles['job']}>
        {translate('review-job')}
        <span className={styles['job__name']}>{job}</span>
      </div>
    </div>
  );
};

export default ReviewCard;

import { Divider } from '@mui/material';
import { translate } from 'src/core/utils';
import { Icon } from 'src/modules/general/components/Icon';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import Rate from 'src/modules/general/components/Rate';
import ReviewCard from 'src/modules/Reviews/components/ReviewCard';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useReviewList } from './useReviewList';

const ReviewsList = () => {
  const {
    data: { reviews, page, totalPage, rate, reviewsCount },
    operations: { onChangePage },
  } = useReviewList();

  return reviewsCount ? (
    <div className={styles['container']}>
      <span className={styles['title']}>{translate('review-title')}</span>
      <div className={styles['rate']}>
        <Rate total={5} rate={rate} />
        <span className={styles['rate__number']}>{rate} </span>
        {translate('review-counts', { count: reviewsCount })}
      </div>
      <div className={styles['reviews']}>
        {reviews.map(review => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
      <Divider />
      <div className="hidden md:block">
        <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
      </div>
      <div className="md:hidden">
        <PaginationMobile page={page} count={totalPage} handleChange={onChangePage} />
      </div>
    </div>
  ) : (
    <div className={styles['empty']}>
      <Icon name="info-circle" fontSize={20} color={variables.color_grey_700} className={styles['empty__icon']} />
      <div className={styles['empty__info']}>
        <span className={styles['empty__info--bold']}>{translate('review-empty-title')}</span>
        {translate('review-empty-subtitle')}
      </div>
    </div>
  );
};

export default ReviewsList;

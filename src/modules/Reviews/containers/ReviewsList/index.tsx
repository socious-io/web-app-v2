import { Divider } from '@mui/material';
import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import Rate from 'src/modules/general/components/Rate';
import ReviewCard from 'src/modules/Reviews/components/ReviewCard';

import styles from './index.module.scss';
import { useReviewList } from './useReviewList';

const ReviewsList = () => {
  const {
    data: { reviews, page, totalPage, rate, reviewsCount },
    operations: { onChangePage },
  } = useReviewList();

  return reviews.length ? (
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
    <AlertMessage
      iconName="info-circle"
      theme="gray"
      title={translate('review-empty-title')}
      subtitle={translate('review-empty-subtitle')}
    />
  );
};

export default ReviewsList;

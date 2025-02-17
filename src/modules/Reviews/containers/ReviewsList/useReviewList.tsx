import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getReviewsAdaptor } from 'src/core/adaptors';
import { ReviewsRes } from 'src/core/adaptors/users/index.types';
import { UserProfile } from 'src/core/api';

export const useReviewList = () => {
  const { reviews, user } = useLoaderData() as { reviews: ReviewsRes; user: UserProfile };
  const limit = 5;
  const [page, setPage] = useState(1);
  const [currentReviews, setCurrentReviews] = useState(reviews);
  const currentList = currentReviews?.items || [];
  const totalPage = Math.ceil((currentReviews?.total || 1) / (currentReviews?.limit || limit));
  const reviewsCount = currentReviews.total || 0;
  const rate = user?.rate || 0;

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getReviewsAdaptor(newPage, limit);
    data && setCurrentReviews(data);
  };

  return {
    data: {
      reviews: currentList,
      page,
      totalPage,
      rate,
      reviewsCount,
    },
    operations: {
      onChangePage,
    },
  };
};

import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import css from './posts-list.module.scss';
import { printWhen } from 'src/core/utils';
import { useNavigate } from '@tanstack/react-location';
import { PostListProps } from './posts-list.types';
import { useState } from 'react';
import { like, unlike } from 'src/pages/feed/refactored/feed.service';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';

export const PostsList = (props: PostListProps) => {
  const { list, onMorePageClick, showMorePage, onChangeList } = props;
  const navigate = useNavigate();

  const onLike = (id: string) => {
    const clone = [...list];
    const ref = clone.find((item) => item.id === id) as Feed;
    ref.liked = true;
    ref.likes = ref.likes + 1;
    onChangeList(clone);
    like(id).then(() => {});
  };
  const onRemoveLike = (id: string) => {
    const clone = [...list];
    const ref = clone.find((item) => item.id === id) as Feed;
    ref.liked = false;
    ref.likes = ref.likes - 1;
    onChangeList(clone);
    unlike(id).then(() => {});
  };
  const seeMoreJSX = (
    <div className={css.seeMore} onClick={() => onMorePageClick()}>
      See more
    </div>
  );

  return (
    <div className={css.container}>
      <FeedList
        data={list}
        onMoreClick={(feed) => navigate({ to: `/feeds/${feed.id}` })}
        onLike={onLike}
        onRemoveLike={onRemoveLike}
        onMorePageClick={showMorePage}
        showSeeMore={false}
      />
      {printWhen(seeMoreJSX, showMorePage)}
    </div>
  );
};

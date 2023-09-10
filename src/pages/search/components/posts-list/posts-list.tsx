import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import css from './posts-list.module.scss';
import { useFeedShared } from 'src/pages/feed/feed.shared';
import { printWhen } from 'src/core/utils';
import { useNavigate } from '@tanstack/react-location';

export const PostsList = (props) => {
  const { list, onMorePageClick, showMorePage } = props;
  console.log('second list', list);
  const navigate = useNavigate();
  const { onLike, onRemoveLike } = useFeedShared();
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

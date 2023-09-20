import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import css from './posts-list.module.scss';
// import { useFeedShared } from 'src/pages/feed/refactored/feed.service';
import { printWhen } from 'src/core/utils';
import { useNavigate } from '@tanstack/react-location';
import { PostListProps } from './posts-list.types';

export const PostsList = (props: PostListProps) => {
  const { list, onMorePageClick, showMorePage } = props;
  const navigate = useNavigate();
  // const { onLike, onRemoveLike } = useFeedShared();
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
        onLike={() => {}}
        onRemoveLike={() => {}}
        onMorePageClick={showMorePage}
        showSeeMore={false}
      />
      {printWhen(seeMoreJSX, showMorePage)}
    </div>
  );
};

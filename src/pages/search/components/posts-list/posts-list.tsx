import { useNavigate } from 'react-router-dom';
import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import { likePost, unlikePost } from 'src/core/api';
import { Post } from 'src/core/api';
import { printWhen } from 'src/core/utils';

import css from './posts-list.module.scss';
import { PostListProps } from './posts-list.types';

export const PostsList = (props: PostListProps) => {
  const { list, onMorePageClick, showMorePage, onChangeList } = props;
  const navigate = useNavigate();

  const onLike = (id: string) => {
    const clone = [...list];
    const ref = clone.find((item) => item.id === id) as Post;
    ref.liked = true;
    ref.likes = ref.likes + 1;
    onChangeList(clone);
    likePost(id);
  };
  const onRemoveLike = (id: string) => {
    const clone = [...list];
    const ref = clone.find((item) => item.id === id) as Post;
    ref.liked = false;
    ref.likes = ref.likes - 1;
    onChangeList(clone);
    unlikePost(id);
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
        onMoreClick={(feed) => {
          console.log('fake');
        }}
        onLike={onLike}
        onRemoveLike={onRemoveLike}
        onMorePageClick={showMorePage}
        showSeeMore={false}
      />
      {printWhen(seeMoreJSX, showMorePage)}
    </div>
  );
};

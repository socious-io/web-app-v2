import { FeedItem } from '../../molecules/feed-item/feed-item';
import { FeedListProps } from './feed-list.types';
import css from './feed-list.module.scss';
import { socialCausesToCategory } from '../../../core/adaptors';
import { useNavigate } from '@tanstack/react-location';

export const FeedList = ({ data, onMorePageClick, onLike, onRemoveLike, showSeeMore }: FeedListProps) => {
  const navigate = useNavigate();

  const actionList = (id: string, likes: number, liked: boolean) => [
    {
      label: likes < 2 ? 'Like' : 'Likes',
      iconName: 'heart-blue',
      like: likes,
      isLiked: liked,
      type: 'like',
      onClick: () => {
        const obj = data.find((item) => item.id === id);
        obj!.liked ? onRemoveLike(id) : onLike(id);
      },
      onLike: () => onLike(id),
      onRemoveLike: () => onRemoveLike(id),
    },
    {
      label: 'Comment',
      iconName: 'comment-blue',
      onClick: () => navigateToPostDetail(id),
      type: 'comment',
    },
  ];

  const navigateToPostDetail = (id: string) => {
    navigate({ to: `./${id}` });
  };

  return (
    <div className={css.container}>
      {data.map((item) => (
        <FeedItem
          key={item.id}
          type={item.identity_type}
          img={item.media != null && item.media.length > 0 ? item.media[0]?.url : ''}
          imgAvatar={item.identity_meta.avatar}
          text={item.content}
          name={item.identity_meta.name}
          actionList={actionList(item.id, item.likes, item.liked)}
          date={item.created_at}
          categories={socialCausesToCategory(item.causes_tags)}
        />
      ))}
      {showSeeMore && (
        <div className={css.seeMore} onClick={() => onMorePageClick()}>
          See more
        </div>
      )}
    </div>
  );
};

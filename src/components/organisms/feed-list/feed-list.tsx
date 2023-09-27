import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { useNavigate } from 'react-router-dom';

import css from './feed-list.module.scss';
import { Feed, FeedListProps } from './feed-list.types';
import { socialCausesToCategory } from '../../../core/adaptors';
import { FeedItem } from '../../molecules/feed-item/feed-item';


export const FeedList = ({ data, onMorePageClick, onLike, onRemoveLike, showSeeMore, onMoreClick }: FeedListProps) => {
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
      onLike: () => {
        return onLike(id);
      },
      onRemoveLike: () => {
        onRemoveLike(id);
      },
    },
    {
      label: 'Comment',
      iconName: 'comment-blue',
      onClick: () => navigateToPostDetail(id),
      type: 'comment',
    },
  ];

  const navigateToPostDetail = (id: string) => {
    hapticsImpactLight();
    navigate(`./${id}`);
  };

  function redirectToProfile(feed: Feed) {
    if (feed.identity_type === 'users') {
      navigate(`/profile/users/${feed.identity_meta.username}/view`);
    } else {
      navigate(`/profile/organizations/${feed.identity_meta.shortname}/view`);
    }
  }

  function setAvatar(feed: Feed) {
    if (feed.identity_type === 'organizations') {
      return feed.identity_meta.image;
    }
    return feed.identity_meta.avatar;
  }

  return (
    <div className={css.container}>
      {data.map((item) => (
        <FeedItem
          onAvatarClick={() => redirectToProfile(item)}
          onMoreClick={() => onMoreClick?.(item)}
          key={item.id}
          type={item.identity_type}
          img={item.media != null && item.media.length > 0 ? item.media[0]?.url : ''}
          imgAvatar={setAvatar(item)}
          text={item.content}
          name={item.identity_meta.name}
          actionList={actionList(item.id, item.likes, item.liked)}
          date={item.created_at}
          categories={socialCausesToCategory(item.causes_tags)}
          lineLimit="none"
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

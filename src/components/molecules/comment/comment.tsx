import { toRelativeTime } from '../../../core/relative-time';
import { Avatar } from '../../atoms/avatar/avatar';
import { ChatBox } from '../../atoms/chat-box/chat-box';
import { Items } from '../../atoms/dropdown/items/items';
import css from './comment.module.scss';
import { CommentProps } from './comment.types';

export const Comment = (props: CommentProps) => {
  const onHeartClick = (data: CommentProps['list'][0]) => {
    if (data.liked) {
      props.onLikeRemove(data.post_id, data.id);
    } else {
      props.onLike(data.post_id, data.id);
    }
  };

  const heartIcon = (data: CommentProps['list'][0]): JSX.Element => {
    return data.liked ? <img src="/icons/heart-filled.svg" /> : <img src="/icons/heart-blue.svg" />;
  };

  const checkingLikeOrLikes = (likes: number) => {
    if (likes <= 1) {
      return 'Like'
    }
    return 'Likes'
  }

  return (
    <>
      {props.list.map((item) => (
        <div key={item.id} className={css.container}>
          <div className={css.info}>
            <Avatar type={item.identity_type} size="2rem" img={item.identity_type === 'users' ? item.identity_meta.avatar : item.identity_meta.image} />
            <span>{item.identity_meta.name}</span>
            <span className={css.date}>{toRelativeTime(item.created_at)}</span>
          </div>

          <div className={css.wrapper}>
            <div className={css.messageBox}>
              <ChatBox type="sender">{item.content}</ChatBox>
            </div>

            <div className={css.like} onClick={() => onHeartClick(item)}>
              {heartIcon(item)}
              <span>{item.likes} {checkingLikeOrLikes(item.likes)}</span>
            </div>
          </div>
        </div>
      ))}

      {props.showSeeMore && (
        <div className={css.seeMore} onClick={() => props.onMorePageClick()}>
          See more
        </div>
      )}
    </>
  );
};

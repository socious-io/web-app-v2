import { Avatar } from 'src/components/atoms/avatar/avatar';
import { ChatBox } from 'src/components/atoms/chat-box/chat-box';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { toRelativeTime } from 'src/core/relative-time';

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
    return data.liked ? <img src="/icons/heart-filled.svg" alt="" /> : <img src="/icons/heart-blue.svg" alt="" />;
  };

  const checkingLikeOrLikes = (likes: number) => {
    if (likes <= 1) {
      return 'Like';
    }
    return 'Likes';
  };

  return (
    <>
      {props.list.map((item) => (
        <div key={item.id} className={css.container}>
          <div className={css.info}>
            <Avatar
              type={item.identity_meta.type}
              size="2rem"
              img={item.identity_meta.type === 'users' ? item.identity_meta.avatar : item.identity_meta.image}
            />
            <span>{item.identity_meta.name}</span>
            <span className={css.date}>{toRelativeTime(item.created_at.toString())}</span>
          </div>

          <div className={css.wrapper}>
            <div className={css.messageBox}>
              <ChatBox type="sender">
                <ExpandableText text={item.content} expectedLength={100} />
              </ChatBox>
            </div>

            <div className={css.like} onClick={() => onHeartClick(item)}>
              {heartIcon(item)}
              <span>
                {item.likes} {checkingLikeOrLikes(item.likes)}
              </span>
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

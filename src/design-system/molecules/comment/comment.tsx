import { toRelativeTime } from '../../../core/relative-time';
import { Avatar } from '../../atoms/avatar/avatar';
import { ChatBox } from '../../atoms/chat-box/chat-box';
import css from './comment.module.scss';
import { CommentProps } from './comment.types';

export const Comment = (props: CommentProps) => {
  return (
    <>
      {props.list.map((item) => (
        <div key={item.id} className={css.container}>
          <div className={css.info}>
            <Avatar type="users" size="2rem" img={item.identity_meta.avatar} />
            <span>{item.identity_meta.name}</span>
            <span className={css.date}>{toRelativeTime(item.created_at)}</span>
          </div>

          <div className={css.wrapper}>
            <div className={css.messageBox}>
              <ChatBox type="sender">{item.content}</ChatBox>
            </div>

            <div className={css.like}>
              <img src="/icons/heart-blue.svg" />
              <span>{item.likes} likes</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

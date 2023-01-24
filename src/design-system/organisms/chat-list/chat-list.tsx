import { Message } from '../../atoms/message/message';
import css from './chat-list.module.scss';
import { ChatListProps } from './chat-list.types';

export const ChatList = (props: ChatListProps): JSX.Element => {
  const { list } = props;
  return (
    <div className={css.container}>
      {list.map((msg) => {
        return (
          <div key={msg.id} className={css.item}>
            <Message
              userType={msg.userType}
              id={msg.id}
              img={msg.img}
              type={msg.type}
              text={msg.text}
            />
          </div>
        );
      })}
    </div>
  );
};

import { toRelativeTime } from 'src/core/relative-time';
import { Message } from '@atoms/message/message';
import css from './chat-list.module.scss';
import { ChatListProps } from './chat-list.types';
import InfiniteScroll from 'react-infinite-scroller';

export const ChatList = (props: ChatListProps): JSX.Element => {
  const { list, loadMore = console.log, hasMore = false } = props;

  return (
    <div className={css.container}>
      <InfiniteScroll
        pageStart={1}
        loadMore={loadMore}
        hasMore={hasMore}
        loader={
          <div className="loader" key={0}>
            Loading ...
          </div>
        }
        useWindow={false}
      >
        {list.map((msg) => {
          return (
            <div key={msg.id} className={css.item}>
              <div className={css.item__time}>{toRelativeTime(msg.time || new Date().toString())}</div>
              <Message identityType={msg.identityType} id={msg.id} img={msg.img} type={msg.type} text={msg.text} />
            </div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

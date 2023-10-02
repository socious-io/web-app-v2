import InfiniteScroll from 'react-infinite-scroller';
import { Search } from 'src/components/atoms/search/search';
import { ContactItem } from 'src/components/molecules/contact-item/contact-item';

import css from './contact-list.module.scss';
import { ContactListProps } from './contact-list.types';

export const ContactList = (props: ContactListProps): JSX.Element => {
  const { list, message, onSearch, onContactClick, ...rest } = props;

  const messageJSX = (
    <div className={css.message}>
      <div className={css.title}>{message?.title}</div>
      <div className={css.body}>{message?.body}</div>
    </div>
  );

  return (
    <div style={rest} className={css.container}>
      <div className={css.searchContainer}>
        <Search flex="1" placeholder="search name" onValueChange={onSearch} />
      </div>
      {message && list.length === 0 && messageJSX}
      <div style={{ height: props.height, overflow: 'auto' }}>
        <InfiniteScroll
          initialLoad={false}
          threshold={800}
          useWindow={false}
          pageStart={1}
          loadMore={props.onScroll}
          hasMore={true}
        >
          {list.map((contactData, i) => {
            return (
              <ContactItem
                width={props.profileViewWidth}
                onContactClick={onContactClick}
                // TODO: find a unique value for key
                key={i}
                {...contactData}
              />
            );
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

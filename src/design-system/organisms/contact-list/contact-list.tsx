import { Search } from '../../atoms/search/search';
import { ContactItem } from '../../molecules/contact-item/contact-item';
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
      {list.map((contactData) => {
        return (
          <ContactItem onContactClick={onContactClick} key={contactData.id} {...contactData} />
        );
      })}
    </div>
  );
};

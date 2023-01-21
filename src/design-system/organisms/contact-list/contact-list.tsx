import { Search } from '../../atoms/search/search';
import { ContactItem } from '../../molecules/contact-item/contact-item';
import css from './contact-list.module.scss';
import { ContactListProps } from './contact-list.types';

export const ContactList = (props: ContactListProps): JSX.Element => {
  const { list, onSearch, ...rest } = props;
  return (
    <div style={rest} className={css.container}>
      <div className={css.searchContainer}>
        <Search flex="1" defaultValue="" placeholder="search name" onValueChange={onSearch} />
      </div>
      <div>
        {list.map((contactData) => (
          <ContactItem key={contactData.id} {...contactData} />
        ))}
      </div>
    </div>
  );
};

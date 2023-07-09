import css from './people-list.module.scss';
import { PeopleListProps } from './people-list.types';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Categories } from 'src/components/atoms/categories/categories';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { socialCausesToCategory } from 'src/core/adaptors';
import { toRelativeTime } from 'src/core/relative-time';
import { getList } from './people-list.services';

export const PeopleList = (props: PeopleListProps): JSX.Element => {
  const { data, onMorePageClick, ...rest } = props;

  return (
    <div style={rest} className={css.container}>
      {data.map((user) => {
        return (
          <Card key={user.id} cursor="pointer" onClick={() => props.onClick(user)}>
            <div className={css.header}>
              <Avatar marginRight="0.5rem" type="users" img={user.avatar || ''} />
              <div className={css.orgNameAndLocation}>
                <div>{`${user.first_name} ${user.last_name}`} </div>
                <div className={css.orgLocation}>{user.address}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.bio}>{user.bio}</div>
              <Categories marginBottom="1rem" list={getList(user)} />
              <CategoriesClickable marginBottom="1rem" list={socialCausesToCategory(user.social_causes)} />
            </div>
            <div className={css.footer}>{toRelativeTime(user.created_at)}</div>
          </Card>
        );
      })}
      <div className={css.seeMore} onClick={() => onMorePageClick()}>
        See more
      </div>
    </div>
  );
};

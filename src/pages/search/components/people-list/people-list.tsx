import css from './people-list.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { PeopleListProps } from './people-list.types';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Categories } from 'src/components/atoms/categories/categories';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { toRelativeTime } from 'src/core/relative-time';
import { getList } from './people-list.services';

export const PeopleList = (props: PeopleListProps): JSX.Element => {
  const { data, onMorePageClick, ...rest } = props;
  console.log({ data });
  const navigate = useNavigate();

  function goToUserProfile(id: string) {
    return () => navigate({ to: `/jobs/${id}` });
  }

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const location = (user: PeopleListProps['data'][0]) =>
    `${user.city}, ${getCountryName(user.country as keyof typeof COUNTRIES_DICT | undefined)}`;

  return (
    <div style={rest} className={css.container}>
      {data.map((user) => {
        return (
          <Card key={user.id} cursor="pointer" onClick={goToUserProfile(user.id)}>
            <div className={css.header}>
              <Avatar marginRight="0.5rem" type="users" img={user.avatar || ''} />
              <div className={css.orgNameAndLocation}>
                <div>{`${user.first_name} ${user.last_name}`} </div>
                {/* <div className={css.orgLocation}>{location(user)}</div> */}
                <div className={css.orgLocation}>{user.address}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.bio}>{user.bio}</div>
              <Categories marginBottom="1rem" list={getList(user)} />
              {/* <div className={css.description}>{convertMDToJSX(user, { length: 200 })}</div> */}
              <CategoriesClickable marginBottom="1rem" list={socialCausesToCategory(user.social_causes)} />
              {/* <CategoriesClickable marginBottom="1rem" list={skillsToCategory(user.skills)} /> */}
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

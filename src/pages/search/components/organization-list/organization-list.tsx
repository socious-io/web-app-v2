import css from './organization-list.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Categories } from 'src/components/atoms/categories/categories';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { socialCausesToCategory } from 'src/core/adaptors';
import { printWhen } from 'src/core/utils';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';
import { OrganizationListProps } from './organization-list.types';

export const OrganizationList = (props: OrganizationListProps) => {
  const { data, onMorePageClick, showMorePage, onClick, ...rest } = props;

  const seeMoreJSX = (
    <div className={css.seeMore} onClick={() => onMorePageClick()}>
      See more
    </div>
  );

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  return (
    <div style={rest} className={css.container}>
      {data.map((organization) => {
        return (
          <Card key={organization.id} cursor="pointer" onClick={() => props.onClick(organization.shortname)}>
            <div className={css.header}>
              <Avatar type="organizations" img={organization?.image?.url} />
              <div className={css.orgNameAndLocation}>
                <div>{`${organization.name}`} </div>
                <div className={css.orgLocation}>{organization.city}</div>
              </div>
            </div>
            <div className={css.body}>
              <div className={css.bio}>{organization.bio}</div>
              <CategoriesClickable marginBottom="1rem" list={socialCausesToCategory(organization.social_causes)} />
            </div>
            <div className={css.footer}>
              {organization.hiring && (
                <div className={css.hiring}>
                  <img src="/icons/hiring.svg" />
                  Hiring
                </div>
              )}
            </div>
          </Card>
        );
      })}

      {printWhen(seeMoreJSX, showMorePage)}
    </div>
  );
};

import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { Button } from '../../../atoms/button/button';
import { CategoriesClickable } from '../../../atoms/categories-clickable/categories-clickable';
import { Search } from '../../../atoms/search/search';
import { BottomStatic } from '../../../templates/bottom-static/bottom-static';
import css from './organization-create-social-causes.module.scss';
import { SOCIAL_CAUSES } from './organization-create-social-causes.services';

export const OrganizationCreateSocialCauses = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  return (
    <div className={css.container}>
      <div className={css.container}>
        <BottomStatic>
          <div>
            <div className={css.header}>
              <div className={css.title}> What are your social causes?</div>
              <div className={css.limitStatement}>
                Select up to 5 social causes.
                <div className={css.search}>
                  <Search
                    placeholder="Search"
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                </div>
              </div>
            </div>
            <div className={css.categoriesContainer}>
              <div className={css.categoryTitle}>Popular</div>
              <CategoriesClickable
                clickable
                onChange={console.log}
                list={SOCIAL_CAUSES}
                selected={[]}
              />
            </div>
          </div>
          <div className={css.bottom}>
            <Button onClick={() => navigate({ to: '../profile' })}>
              Continue
            </Button>
          </div>
        </BottomStatic>
      </div>
    </div>
  );
};

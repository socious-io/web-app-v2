import { Button } from '../../../atoms/button/button';
import { CategoriesClickable } from '../../../atoms/categories-clickable/categories-clickable';
import { BottomStatic } from '../../../templates/bottom-static/bottom-static';
import css from './organization-create-social-causes.module.scss';
import { SOCIAL_CAUSES } from './organization-create-social-causes.services';

export const OrganizationCreateSocialCauses = (): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.container}>
        <BottomStatic>
          <div>
            <div className={css.question}>
              <div className={css.title}> What are your social causes?</div>
              <div className={css.limitStatement}>
                Select up to 5 social causes.
              </div>
            </div>
            <div className={css.categoriesContainer}>
              <div className={css.categoryTitle}>Popular</div>
              <CategoriesClickable
                onChange={console.log}
                list={SOCIAL_CAUSES}
                selected={['Mental Health', 'Biodiversity']}
              />
            </div>
          </div>
          <div className={css.bottom}>
            <Button>Continue</Button>
          </div>
        </BottomStatic>
      </div>
    </div>
  );
};

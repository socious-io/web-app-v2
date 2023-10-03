import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store';
import { resetCreatePostWizard, setPostCausesTags } from 'src/store/reducers/createPostWizard.reducer';

import css from './mobile.module.scss';
import { useSocialCausesShared } from '../social-causes.shared';

export const Mobile = (): JSX.Element => {
  const navigate = {};
  const dispatch = useDispatch();
  const { onSearch, socialCauses, selectedSocialCauses, isValid } = useSocialCausesShared();

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  function onBack() {
    navigate({ to: `/m/jobs/created/${identity.meta.id}` });
    dispatch(resetCreatePostWizard());
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={onBack}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>What is your job about?</div>
        <div className={css.limitStatement}>Select up to 1 social cause</div>
      </div>
      <div className={css.search}>
        <Search
          backgroundColor="var(--color-off-white-01)"
          width="100%"
          placeholder="Search"
          onValueChange={onSearch}
        />
      </div>
      <div className={css.main}>
        <div className={css.categoryTitle}>Popular</div>
        <CategoriesClickable
          clickable
          onChange={(list) => dispatch(setPostCausesTags(list))}
          list={socialCauses}
          selected={selectedSocialCauses}
        />
      </div>

      <div className={css.bottom}>
        <Button disabled={!isValid} onClick={() => navigate({ to: '../skills' })}>
          Continue
        </Button>
      </div>
    </div>
  );
};

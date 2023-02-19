import css from './mobile.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socialCausesToCategoryAdaptor } from '../../../../../core/adaptors';
import { IdentityReq } from '../../../../../core/types';
import { resetCreatePostWizard, setPostCausesTags } from '../../../../../store/reducers/createPostWizard.reducer';
import { RootState } from '../../../../../store/store';
import { Button } from '../../../../atoms/button/button';
import { CategoriesClickable } from '../../../../atoms/categories-clickable/categories-clickable';
import { Search } from '../../../../atoms/search/search';

export const Mobile = (): JSX.Element => {
  const [socialCauses, setSocialCauses] = useState(socialCausesToCategoryAdaptor());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const selectedSocialCauses = useSelector<RootState, string[]>((state) => {
    return state.createPostWizard.causes_tags;
  });

  function onSearch(v: string) {
    const filteredValue = socialCausesToCategoryAdaptor().filter((item) => item.label.toLowerCase().includes(v));
    setSocialCauses(filteredValue);
  }

  function onBack() {
    navigate({ to: `/jobs/created/${identity.meta.id}` });
    dispatch(resetCreatePostWizard());
  }

  const isValid = selectedSocialCauses.length > 0 && selectedSocialCauses.length <= 5;

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
        <div className={css.limitStatement}>Select up to 5 social cause</div>
      </div>
      <div className={css.search}>
        <Search backgroundColor="var(--color-off-white-01)" width="100%" placeholder="Search" onValueChange={onSearch} />
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

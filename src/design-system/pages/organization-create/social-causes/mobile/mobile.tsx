import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSocialCauses } from '../../../../../store/reducers/createOrgWizard.reducer';
import { RootState } from '../../../../../store/store';
import { Button } from '../../../../atoms/button/button';
import { CategoriesClickable } from '../../../../atoms/categories-clickable/categories-clickable';
import { Search } from '../../../../atoms/search/search';
import { Steps } from '../../../../atoms/steps/steps';
import { SOCIAL_CAUSES } from '../social-causes.services';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const [list, setList] = useState(SOCIAL_CAUSES);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socialCauses = useSelector<RootState, string[]>((state) => {
    return state.createOrgWizard.socialCauses;
  });

  function onSearch(value: string) {
    const filtered = SOCIAL_CAUSES.filter((item) => item.label.toLowerCase().includes(value));
    setList(filtered);
  }

  const isValid = socialCauses.length > 0 && socialCauses.length <= 5;

  function onChange(value: string[]) {
    dispatch(setSocialCauses(value));
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: '../type' })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.stepsContainer}>
          <Steps clickable={false} length={6} current={2} />
        </div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>What are your social causes?</div>
        <div className={css.limitStatement}>Select up to 5 social causes.</div>
      </div>
      <div className={css.search}>
        <Search width="100%" placeholder="Search" onValueChange={onSearch} />
      </div>
      <div className={css.main}>
        <div className={css.categoryTitle}>Popular</div>
        <CategoriesClickable clickable onChange={onChange} list={list} selected={socialCauses} />
      </div>

      <div className={css.bottom}>
        <Button disabled={!isValid} onClick={() => navigate({ to: '../profile' })}>
          Continue
        </Button>
      </div>
    </div>
  );
};

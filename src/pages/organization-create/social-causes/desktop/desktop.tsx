import { useState } from 'react';
import { Button } from '@atoms/button/button';
import Card from '@atoms/card';
import { CategoriesClickable } from '@atoms/categories-clickable/categories-clickable';
import { Search } from '@atoms/search/search';
import { Steps } from '@atoms/steps/steps';
import css from './desktop.module.scss';
import { useOrganizationCreateShared } from '../../organization-create.shared';
import { SOCIAL_CAUSES } from '../social-causes.services';
import clsx from 'clsx';

export const Desktop = (): JSX.Element => {
  const { socialCauses, updateSocialCauses, isSocialCausesValid, navigateToProfile, navigateToType } =
    useOrganizationCreateShared();
  const [list, setList] = useState(SOCIAL_CAUSES);

  function onSearch(value: string) {
    const filtered = SOCIAL_CAUSES.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setList(filtered);
  }

  return (
    <div className={css.container}>
      <Card className={clsx(css.card, "p0")}>
        <div className={css.header}>
          <div className={css.chevron} onClick={navigateToType}>
            <img height={24} src="/icons/chevron-left.svg" />
          </div>
          <div className={css.stepsContainer}>
            <Steps clickable={false} length={6} current={2} />
          </div>
        </div>
        <div className={css.questionContainer}>
          <div className={css.question}>What are your social causes?</div>
          <div className={css.limitStatement}>Select up to 5 social causes.</div>
          <div className={css.search}>
            <Search width="100%" placeholder="Search" onValueChange={onSearch} />
          </div>
        </div>
        <div className={css.main}>
          <div className={css.categoryTitle}>Popular</div>
          <CategoriesClickable clickable onChange={updateSocialCauses} list={list} selected={socialCauses} />
        </div>
        <div className={css.buttonContainer}>
          <Button disabled={!isSocialCausesValid} onClick={navigateToProfile}>
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};

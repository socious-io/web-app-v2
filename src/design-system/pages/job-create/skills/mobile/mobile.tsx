import css from './mobile.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { skillsToCategoryAdaptor } from '../../../../../core/adaptors';
import { IdentityReq } from '../../../../../core/types';
import { RootState } from '../../../../../store/store';
import { Button } from '../../../../atoms/button/button';
import { CategoriesClickable } from '../../../../atoms/categories-clickable/categories-clickable';
import { Search } from '../../../../atoms/search/search';

export const Mobile = (): JSX.Element => {
  const [socialCauses, setSocialCauses] = useState(skillsToCategoryAdaptor());
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  function onSearch(v: string) {
    const filteredValue = skillsToCategoryAdaptor().filter((item) =>
      item.label.toLowerCase().includes(v)
    );
    setSocialCauses(filteredValue);
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div
          className={css.chevron}
          onClick={() => navigate({ to: `/jobs/my-jobs/${identity.meta.id}` })}
        >
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>Select up to 10 relevant skills</div>
        <div className={css.limitStatement}>Skills used in this project</div>
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
          onChange={setSelected}
          list={socialCauses}
          selected={selected}
        />
      </div>

      <div className={css.bottom}>
        <Button disabled={!selected.length} onClick={() => navigate({ to: '../info' })}>
          Continue
        </Button>
      </div>
    </div>
  );
};

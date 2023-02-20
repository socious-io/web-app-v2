import css from './mobile.module.scss';
import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skillsToCategoryAdaptor } from '../../../../core/adaptors';
import { RootState } from '../../../../store/store';
import { Button } from '../../../../components/atoms/button/button';
import { CategoriesClickable } from '../../../../components/atoms/categories-clickable/categories-clickable';
import { Search } from '../../../../components/atoms/search/search';
import { setPostSkills } from '../../../../store/reducers/createPostWizard.reducer';

export const Mobile = (): JSX.Element => {
  const [socialCauses, setSocialCauses] = useState(skillsToCategoryAdaptor());
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedSkills = useSelector<RootState, string[]>((state) => {
    return state.createPostWizard.skills;
  });

  function onSearch(v: string) {
    const filteredValue = skillsToCategoryAdaptor().filter((item) => item.label.toLowerCase().includes(v));
    setSocialCauses(filteredValue);
  }

  const isValid = selectedSkills.length > 0 && selectedSkills.length <= 10;

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: `../social-causes` })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>Select up to 10 relevant skills</div>
        <div className={css.limitStatement}>Skills used in this project</div>
      </div>
      <div className={css.search}>
        <Search backgroundColor="var(--color-off-white-01)" width="100%" placeholder="Search" onValueChange={onSearch} />
      </div>
      <div className={css.main}>
        <div className={css.categoryTitle}>Popular</div>
        <CategoriesClickable
          clickable
          onChange={(list) => dispatch(setPostSkills(list))}
          list={socialCauses}
          selected={selectedSkills}
        />
      </div>

      <div className={css.bottom}>
        <Button disabled={!isValid} onClick={() => navigate({ to: '../info' })}>
          Continue
        </Button>
      </div>
    </div>
  );
};

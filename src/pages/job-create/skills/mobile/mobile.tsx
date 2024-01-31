import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { setPostSkills } from 'src/store/reducers/createPostWizard.reducer';

import css from './mobile.module.scss';
import { useSkillsShared } from '../skills.shared';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onSearch, socialCauses, selectedSkills, isValid } = useSkillsShared();

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate(`../social-causes`)}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
      <div className={css.questionContainer}>
        <div className={css.question}>Select up to 10 relevant skills</div>
        <div className={css.limitStatement}>Skills used in this job</div>
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
          onChange={(list) => dispatch(setPostSkills(list))}
          list={socialCauses}
          selected={selectedSkills}
        />
      </div>

      <div className={css.bottom}>
        <Button disabled={!isValid} onClick={() => navigate('../info')}>
          Continue
        </Button>
      </div>
    </div>
  );
};

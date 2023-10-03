import { useDispatch } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { Job } from 'src/components/organisms/job-list/job-list.types';

import css from './mobile.module.scss';
import { createFormInitState, jobEditRequest } from '../../info/info.services';
import { useSkillsShared } from '../skills.shared';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { overview } = useLoaderData() as { overview: Job };
  const { onSearch, socialCauses, selectedSkills, isValid, setSelectedSkills } = useSkillsShared(overview.skills);
  function editSkills() {
    jobEditRequest(overview.id, { ...createFormInitState(overview), skills: selectedSkills }).then((resp) => {
      navigate(`/jobs/created/${overview.id}/overview`);
    });
  }
  function onBack() {
    navigate(`/jobs/created/${overview.id}/overview`);
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={onBack}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Skills</div>
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
          onChange={(list) => {
            setSelectedSkills(list);
          }}
          list={socialCauses}
          selected={selectedSkills}
        />
      </div>

      <div className={css.bottom}>
        <Button disabled={!isValid} onClick={editSkills}>
          Save changes
        </Button>
        <Button color="white" onClick={onBack}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

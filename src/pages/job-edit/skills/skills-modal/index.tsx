import { WebModal } from 'src/components/templates/web-modal';
import { Search } from 'src/components/atoms/search/search';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { SkillsModalProps } from './skills-modal.types';
import { useSkillsShared } from '../skills.shared';
import css from './skills-modal.module.scss';

import { createFormInitState, jobEditRequest } from '../../info/info.services';

export const SkillsModal: React.FC<SkillsModalProps> = ({ open, onClose, onDone, jobOverview }) => {
  const { onSearch, socialCauses, selectedSkills, isValid, setSelectedSkills } = useSkillsShared(jobOverview.skills);

  function editSkills() {
    jobEditRequest(jobOverview.id, {
      ...createFormInitState(jobOverview),
      skills: selectedSkills,
    }).then((resp) => {
      onClose();
      onDone(resp);
    });
  }
  return (
    <>
      <WebModal
        header="Skills"
        open={open}
        onClose={() => {
          onClose();
        }}
        buttons={[
          {
            children: 'Save changes',
            disabled: !isValid,
            color: 'primary',
            onClick: () => {
              editSkills();
              onClose();
            },
          },
          {
            children: 'Cancel',
            color: 'white',
            onClick: () => {
              onClose();
            },
          },
        ]}
      >
        <>
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
                // dispatch(setPostSkills(list));
              }}
              list={socialCauses}
              selected={selectedSkills}
            />
          </div>
        </>
      </WebModal>
    </>
  );
};

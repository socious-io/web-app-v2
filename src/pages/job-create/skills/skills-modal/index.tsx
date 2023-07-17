import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { WebModal } from 'src/components/templates/web-modal';
import { Search } from 'src/components/atoms/search/search';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { SkillsModalProps } from './skills-modal.types';
import { setPostSkills } from 'src/store/reducers/createPostWizard.reducer';
import { InfoModal } from 'src/pages/job-create/info/info-modal';
import { useSkillsShared } from '../skills.shared';
import css from './skills-modal.module.scss';

export const SkillsModal: React.FC<SkillsModalProps> = ({ open, onClose, onDone, onBack, onOpen }) => {
  const dispatch = useDispatch();
  const { onSearch, socialCauses, selectedSkills, isValid } = useSkillsShared();
  const [openInfoModal, setOpenInfoModal] = useState(false);

  return (
    <>
      <WebModal
        header="Create job"
        open={open}
        onClose={onClose}
        onBack={onBack}
        buttons={[
          {
            children: 'Continue',
            disabled: !isValid,
            onClick: () => {
              onClose();
              setOpenInfoModal(true);
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
              onChange={(list) => dispatch(setPostSkills(list))}
              list={socialCauses}
              selected={selectedSkills}
            />
          </div>
        </>
      </WebModal>
      <InfoModal
        open={openInfoModal}
        onClose={() => setOpenInfoModal(false)}
        onDone={onDone}
        onBack={() => {
          setOpenInfoModal(false);
          onOpen();
        }}
        onOpen={() => setOpenInfoModal(true)}
      />
    </>
  );
};

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { WebModal } from 'src/components/templates/web-modal';
import { Search } from 'src/components/atoms/search/search';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { SkillsModal } from 'src/pages/job-create/skills/skills-modal';
import { setPostCausesTags } from 'src/store/reducers/createPostWizard.reducer';
import { SocialCausesModalProps } from './social-causes-modal.types';
import { useSocialCausesShared } from '../social-causes.shared';
import css from './social-causes-modal.module.scss';

export const SocialCausesModal: React.FC<SocialCausesModalProps> = ({ open, onClose, onDone, onOpen }) => {
  const dispatch = useDispatch();
  const { onSearch, socialCauses, selectedSocialCauses, isValid } = useSocialCausesShared();
  const [openSkillsModal, setOpenSkillsModal] = useState(false);

  return (
    <>
      <WebModal
        header="Create job"
        open={open}
        onClose={onClose}
        buttons={[
          {
            children: 'Continue',
            disabled: !isValid,
            onClick: () => {
              onClose();
              setOpenSkillsModal(true);
            },
          },
        ]}
      >
        <>
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
        </>
      </WebModal>
      <SkillsModal
        open={openSkillsModal}
        onClose={() => setOpenSkillsModal(false)}
        onDone={onDone}
        onBack={() => {
          setOpenSkillsModal(false);
          onOpen();
        }}
        onOpen={() => setOpenSkillsModal(true)}
      />
    </>
  );
};

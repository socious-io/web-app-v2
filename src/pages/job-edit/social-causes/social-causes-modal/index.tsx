import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { WebModal } from 'src/components/templates/web-modal';
import { JobReq } from 'src/core/api';
import { createFormInitState, jobEditRequest } from 'src/pages/job-edit/info/info.services';
import { useSocialCausesShared } from 'src/pages/job-edit/social-causes/social-causes.shared';

import css from './social-causes-modal.module.scss';
import { SocialCausesModalProps } from './social-causes-modal.types';

export const SocialCausesModal: React.FC<SocialCausesModalProps> = ({ open, onClose, onDone, jobOverview }) => {
  const { onSearch, socialCauses, selectedSocialCauses, isValid, setSelectedSocialCauses } = useSocialCausesShared(
    jobOverview.causes_tags,
  );

  function editSocialCauses() {
    jobEditRequest(jobOverview.id, {
      ...createFormInitState(jobOverview),
      causes_tags: selectedSocialCauses,
    } as JobReq).then((resp) => {
      onClose();
      onDone(resp);
    });
  }
  return (
    <>
      <WebModal
        header="Social causes"
        open={open}
        onClose={() => {
          onClose();
        }}
        buttons={[
          {
            children: 'Save changes',
            disabled: !isValid,
            onClick: () => {
              editSocialCauses();
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
              onChange={(list) => setSelectedSocialCauses(list)}
              list={socialCauses}
              selected={selectedSocialCauses}
            />
          </div>
        </>
      </WebModal>
    </>
  );
};

import { WebModal } from '@templates/web-modal';
import { Search } from '@atoms/search/search';
import { CategoriesClickable } from '@atoms/categories-clickable/categories-clickable';
import { SocialCausesModalProps } from './social-causes-modal.types';
import { useSocialCausesShared } from '../social-causes.shared';
import css from './social-causes-modal.module.scss';
import { createFormInitState, jobEditRequest } from '../../info/info.services';

export const SocialCausesModal: React.FC<SocialCausesModalProps> = ({ open, onClose, onDone, jobOverview }) => {
  const { onSearch, socialCauses, selectedSocialCauses, isValid, setSelectedSocialCauses } = useSocialCausesShared(
    jobOverview.causes_tags
  );

  function editSocialCauses() {
    jobEditRequest(jobOverview.id, { ...createFormInitState(jobOverview), causes_tags: selectedSocialCauses }).then(
      (resp) => {
        onClose();
        onDone(resp);
      }
    );
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

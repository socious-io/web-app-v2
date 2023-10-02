import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { Job } from 'src/components/organisms/job-list/job-list.types';

import css from './mobile.module.scss';
import { createFormInitState, jobEditRequest } from '../../info/info.services';
import { useSocialCausesShared } from '../social-causes.shared';

export const Mobile = (): JSX.Element => {
  const navigate = {};
  const { overview } = useMatch().ownData as { overview: Job };
  const { onSearch, socialCauses, selectedSocialCauses, isValid, setSelectedSocialCauses } = useSocialCausesShared(
    overview.causes_tags,
  );
  function editSocialCauses() {
    jobEditRequest(overview.id, { ...createFormInitState(overview), causes_tags: selectedSocialCauses }).then(() => {
      onBack();
    });
  }
  function onBack() {
    navigate({ to: `/m/jobs/created/${overview.id}/overview` });
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={onBack}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Social causes</div>
      </div>
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

      <div className={css.bottom}>
        <Button disabled={!isValid} onClick={editSocialCauses}>
          Save changes
        </Button>
        <Button color="white" onClick={onBack}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Divider } from 'src/components/templates/divider/divider';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Categories } from 'src/components/atoms/categories/categories';
import { ApplyModal } from 'src/pages/job-apply/apply/apply-modal';
import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { convertMDToJSX } from 'src/core/convert-md-to-jsx';
import { printWhen } from 'src/core/utils';
import { getCategories } from '../job-detail.services';
import { useJobDetailShared } from '../job-detail.shared';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const { navigate, userIdentity, identity, job } = useJobDetailShared();
  const [openApplyModal, setOpenApplyModal] = useState(false);

  function onApply() {
    setOpenApplyModal(true);
  }

  const buttonJSX = (
    <Button disabled={job.applied} onClick={onApply}>
      Apply now
    </Button>
  );

  const applicationSubmittedJSX = (
    <div className={css.appSubmitted}>
      <img src="/icons/document-check-black.svg" />
      <div>Application submitted</div>
    </div>
  );

  const skillsJSX = (
    <Divider title="Skills">
      <CategoriesClickable list={skillsToCategory(job.skills)} />
    </Divider>
  );

  const socialCausesJSX = (
    <Divider title="Social cause">
      <CategoriesClickable list={socialCausesToCategory(job.causes_tags)} />
    </Divider>
  );

  function navigateToJobs() {
    navigate({ to: '/jobs' });
  }

  return (
    <>
      <TwoColumnCursor>
        <div className={css.sidebar}>
          <Card cursor="pointer" onClick={navigateToJobs}>
            <div className={css.back}>
              <img src="/icons/chevron-left.svg" />
              <div>Jobs</div>
            </div>
          </Card>
          <Card>
            <div className={css.profileHeader}>
              <Avatar img={userIdentity.avatar} type="users" />
              <div>
                <div className={css.username}>{userIdentity.name}</div>
                <div className={css.profileLink}>View my profile</div>
              </div>
            </div>
            <div className={css.profileFooter}>
              <div className={css.connections}>Connections</div>
              <div className={css.followers}>Followers</div>
            </div>
          </Card>
        </div>
        <Card className={css.card} padding={0}>
          {printWhen(applicationSubmittedJSX, job.applied && identity.type === 'users')}
          <Divider>
            <div className={css.firstRow}>
              <ProfileView
                name={job.identity_meta.name}
                location={job.identity_meta.city}
                img={job.identity_meta.image}
                type={job.identity_type}
              />
              <div className={css.jobTitle}>{job.title}</div>
              <Categories marginBottom="1rem" list={getCategories(job)} />
              <div className={css.btnContainer}>{printWhen(buttonJSX, identity.type === 'users')}</div>
            </div>
          </Divider>
          {printWhen(socialCausesJSX, !!job.causes_tags)}
          <Divider title="Job description">{convertMDToJSX(job.description, { length: null })}</Divider>
          {printWhen(skillsJSX, !!job.skills)}
        </Card>
      </TwoColumnCursor>
      <ApplyModal open={openApplyModal} onClose={() => setOpenApplyModal(false)} />
    </>
  );
};

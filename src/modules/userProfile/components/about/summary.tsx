import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { IconButton } from 'src/modules/general/components/iconButton';
import { useSeeMore } from 'src/modules/general/utils';
import { EditSummary } from 'src/modules/userProfile/containers/editSummery';
import { RootState } from 'src/store';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './about.module.scss';

export const Summary = () => {
  const identity = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });

  const {
    data: { seeMore, copyProcessed },
    operations: { handleSeeMore },
  } = useSeeMore(identity?.mission ?? '');

  const myProfile = currentIdentity?.id === identity?.id;
  const type = currentIdentity?.type;
  const [openEditModal, setOpenEditModal] = useState(false);

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>
          Summary
          {myProfile && (
            <IconButton
              iconName="pencil-01"
              iconColor={variables.color_grey_600}
              iconSize={20}
              size="medium"
              customStyle={css.editBtn}
              onClick={() => setOpenEditModal(true)}
            />
          )}
        </div>
        <div className={css.mission}>
          <p>
            {copyProcessed}
            {seeMore && (
              <span className={css.seeMoreBtn} onClick={handleSeeMore}>
                see more
              </span>
            )}
          </p>
        </div>
      </div>
      <EditSummary open={openEditModal} handleClose={() => setOpenEditModal(false)} type={type} />
    </>
  );
};

import { useState } from 'react';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import { EditSummary } from 'src/Nowruz/modules/userProfile/containers/editSummery';
import { RootState } from 'src/store';

import css from './about.module.scss';

export const Summary = () => {
  const identity = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
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
        <div>{identity?.mission}</div>
      </div>
      <EditSummary open={openEditModal} handleClose={() => setOpenEditModal(false)} type={type} />
    </>
  );
};

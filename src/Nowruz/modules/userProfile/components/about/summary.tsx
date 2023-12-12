import { useState } from 'react';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { CurrentIdentity, User } from 'src/core/api';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import { EditSummary } from 'src/Nowruz/modules/userProfile/containers/editSummery';
import { RootState } from 'src/store';

import css from './about.module.scss';

export const Summary = () => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;
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
        <div>{user?.mission}</div>
      </div>
      <EditSummary open={openEditModal} handleClose={() => setOpenEditModal(false)} />
    </>
  );
};

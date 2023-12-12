import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { skillsToCategory } from 'src/core/adaptors';
import { CurrentIdentity, User } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { ChipList } from 'src/Nowruz/modules/general/components/chipList';
import { EditSkills } from 'src/Nowruz/modules/userProfile/containers/editSkills';
import { RootState } from 'src/store';

import css from './about.module.scss';

export const Skills = () => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  const items = user?.skills ? skillsToCategory(user?.skills).map((skill) => skill.label) : [];
  const [openEditModal, setOpenEditModal] = useState(false);
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>
          Skills
          {myProfile && (
            <IconButton className={css.editBtn} onClick={() => setOpenEditModal(true)}>
              <Icon name="pencil-01" color={variables.color_grey_600} fontSize={20} />
            </IconButton>
          )}
        </div>
        <ChipList items={items} />
      </div>
      <EditSkills open={openEditModal} handleClose={() => setOpenEditModal(false)} />
    </>
  );
};

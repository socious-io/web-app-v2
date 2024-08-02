import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { skillsToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { ChipList } from 'src/modules/general/components/chipList';
import { IconButton } from 'src/modules/general/components/iconButton';
import { EditSkills } from 'src/modules/userProfile/containers/editSkills';
import { RootState } from 'src/store';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './about.module.scss';

export const Skills = () => {
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  }) as User;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  const items = user?.skills ? skillsToCategory(user?.skills).map(skill => skill.label) : [];
  const [openEditModal, setOpenEditModal] = useState(false);
  const { t } = useTranslation('profile');
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>
          {t('skillsText')}
          {myProfile && (
            <IconButton
              size="medium"
              iconName="pencil-01"
              iconColor={variables.color_grey_600}
              iconSize={20}
              customStyle={css.editBtn}
              onClick={() => setOpenEditModal(true)}
            />
          )}
        </div>
        <ChipList
          items={items}
          bgColor={variables.color_grey_blue_50}
          borderColor={variables.color_grey_blue_200}
          fontColor={variables.color_grey_blue_700}
        />
      </div>
      <EditSkills open={openEditModal} handleClose={() => setOpenEditModal(false)} />
    </>
  );
};

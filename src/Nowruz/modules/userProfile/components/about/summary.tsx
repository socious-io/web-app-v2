import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { CurrentIdentity, User } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
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

  return (
    <div className="w-full flex flex-col gap-5">
      <div className={css.title}>
        Summary
        {myProfile && (
          <div className={css.editBtn}>
            <Icon name="pencil-01" color={variables.color_grey_600} fontSize={20} />
          </div>
        )}
      </div>
      <div>{user?.bio}</div>
    </div>
  );
};

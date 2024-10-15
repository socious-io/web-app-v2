import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, logout } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { getIdentityMeta } from 'src/core/utils';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { RootState } from 'src/store';
import { removeIdentityList } from 'src/store/reducers/identity.reducer';

export const useImportLinkedInLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const primary = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const items = [
    {
      iconName: 'log-out-01',
      label: 'Log out',
      onClick: async () => {
        try {
          await logout();
          dispatch(removeIdentityList());
          nonPermanentStorage.clear();
          localStorage.clear();
          navigate('/sign-in');
        } catch (e) {
          console.log('error in logout', e);
        }
      },
    },
  ];

  const { username, profileImage } = getIdentityMeta(primary);
  const accounts: AccountItem[] = [
    {
      id: primary?.id || '',
      type: 'users',
      name: primary?.meta.name || '',
      username: username,
      img: profileImage,
      selected: true,
    },
  ];

  return { data: { items, accounts } };
};

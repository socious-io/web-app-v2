import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, OrgMeta, UserMeta, identities } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { AccountItem } from './avatarDropDown.types';

export const useAvatarDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function mapTpAccountItem(identity?: CurrentIdentity) {
    return {
      id: identity?.meta.id || '',
      name: identity?.meta.name || '',
      img: (identity?.meta as OrgMeta).image || (identity?.meta as UserMeta).avatar || '',
      type: identity?.type || 'users',
      username: (identity?.meta as UserMeta).username || (identity?.meta as OrgMeta).shortname || '',
      selected: identity?.current || false,
    };
  }

  const accountList = useSelector<RootState, AccountItem[]>((state) => {
    return state.identity.entities.map((item) => {
      return mapTpAccountItem(item);
    });
  });
  const selectedAccount = useSelector<RootState, AccountItem>((state) => {
    const current = state.identity.entities.find((item) => item.current);
    return mapTpAccountItem(current);
  });
  const otherAccounts = useSelector<RootState, AccountItem[]>((state) => {
    return state.identity.entities
      .filter((item) => !item.current)
      .map((item) => {
        return mapTpAccountItem(item);
      });
  });

  const handleAvatarClick = () => {
    setOpen(!open);
  };

  const switchAccount = async (accountId: string) => {
    await nonPermanentStorage.set({ key: 'identity', value: accountId });
    identities()
      .then((resp) => dispatch(setIdentityList(resp)))
      .then(() => navigate('/jobs'))
      .then(() => setOpen(false));
  };

  return { switchAccount, open, handleAvatarClick, accountList, selectedAccount, otherAccounts };
};

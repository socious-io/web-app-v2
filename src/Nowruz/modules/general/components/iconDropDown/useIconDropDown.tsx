import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, OrgMeta, Organization, User, UserMeta, identities } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useIconDropDown = () => {
  const user = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const switchAccount = async (accountId: string) => {
    await nonPermanentStorage.set({ key: 'identity', value: accountId });
    identities()
      .then((resp) => dispatch(setIdentityList(resp)))
      .then((resp) => {
        console.log('test log resp', resp);
        const current = resp.payload.find((item) => item.id === accountId);
        const path =
          current?.type === 'users'
            ? `profile/users/${(current.meta as UserMeta).username}/view`
            : `profile/organizations/${(current?.meta as OrgMeta).shortname}/view`;
        navigate(path);
      })
      .then(() => setOpen(false));
  };

  const handleClick = () => {
    if (myProfile) setOpen(!open);
    return;
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return { switchAccount, open, myProfile, handleClick, handleOpen, handleClose };
};

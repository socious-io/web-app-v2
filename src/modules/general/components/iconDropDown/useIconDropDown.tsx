import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { getAuthUrlAdaptor } from 'src/core/adaptors';
import { CurrentIdentity, OrgMeta, Organization, User, identities } from 'src/core/api';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

export const useIconDropDown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  const [open, setOpen] = useState(false);

  const switchAccount = async (accountId: string) => {
    await nonPermanentStorage.set({ key: 'identity', value: accountId });
    identities()
      .then(resp => dispatch(setIdentityList(resp)))
      .then(resp => {
        const current = resp.payload.find(item => item.id === accountId);
        const route =
          current?.type === 'users' ? '/dashboard/user' : `/dashboard/${(current?.meta as OrgMeta).shortname}/org`;
        navigate(route);
      })
      .then(() => setOpen(false));
  };

  const onCreateAccount = async () => {
    if (currentIdentity?.type === 'organizations') {
      localStorage.setItem('registerFor', 'user');
      const { error, data } = await getAuthUrlAdaptor(config.appBaseURL + 'oauth/socious');
      if (error) return;
      if (data) window.location.href = data.url;
    } else {
      localStorage.setItem('registerFor', 'organization');
      window.location.href =
        config.accountCenterURL + `organizations/register/pre?next=${config.appBaseURL}${pathname.slice(1)}`;
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return { switchAccount, open, myProfile, handleClick, handleOpen, handleClose, onCreateAccount };
};

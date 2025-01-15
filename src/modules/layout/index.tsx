import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from 'src/core/api';
import { DeepLinks } from 'src/core/deepLinks';
import useHideScrollbar from 'src/core/hooks/useHideScrollbar';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';
import store from 'src/store';
import { removeIdentityList } from 'src/store/reducers/identity.reducer';

import HeaderNavBar from './components/headerNavBar';
import { NavBar } from './components/navBar';

export const Layout = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const scrollbarWidth = window.innerWidth - document.body.clientWidth;
  useHideScrollbar(open);

  const logOut = async () => {
    store.dispatch(removeIdentityList());
    await logout();
    setOpen(false);
    nonPermanentStorage.clear();
    localStorage.clear();
    navigate('/sign-in');
  };

  return (
    <div className="w-full h-dvh relative">
      <div className="w-full h-full relative flex flex-col md:pl-20">
        <div
          className="w-full fixed top-0 right-0 z-20 bg-Base-White"
          style={{ marginRight: open ? `${scrollbarWidth}px` : '0' }}
        >
          <HeaderNavBar setOpen={setOpen} logout={logOut} />
        </div>
        <div className="w-full h-[calc(100%-64px)] mt-16 md:mt-[72px] md:h-[calc(100%-72px)]">
          <Outlet />
        </div>
      </div>

      <NavBar open={open} setOpen={setOpen} logout={logOut} />
    </div>
  );
};

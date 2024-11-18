import React from 'react';
import { useLocation } from 'react-router-dom';
import { translate } from 'src/core/utils';
import { Icon } from 'src/modules/general/components/Icon';
import { IconDropDown } from 'src/modules/general/components/iconDropDown';
import { Input } from 'src/modules/general/components/input/input';
import { Overlay } from 'src/modules/general/components/slideoutMenu';
import { SearchModal } from 'src/modules/Search/containers/SearchModal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './headerNavBar.module.scss';
import { useHeaderNavBar } from './useHeaderNavBar';
import { Notifications } from '../../containers/notifications';
import NotifBellIcon from '../notifBellIcon';
import { StatusDropDown } from '../statusDropDown';

interface HeaderNavBarProps {
  setOpen: (val: boolean) => void;
  logout: () => void;
}
const HeaderNavBar: React.FC<HeaderNavBarProps> = ({ setOpen, logout }) => {
  const {
    userIsLoggedIn,
    userType,
    image,
    accounts,
    openToVolunteer,
    openToWork,
    hiring,
    handleOpenToWork,
    handleOpenToVolunteer,
    handleHiring,
    openNotifPanel,
    setOpenNotifPanel,
    notifList,
    navigateToProfile,
    unreadNotif,
    readNotifications,
    navigateToSettings,
    openSearchModal,
    setOpenSearchModal,
    searchTerm,
    setSearchTerm,
  } = useHeaderNavBar();

  const path = useLocation().pathname;
  const pages = ['/jobs', '/jobs/saved', '/jobs/recommended'];
  const searchPlaceholder =
    pages.includes(path) && userType === 'users' ? translate('header-search-skill') : translate('header-search');

  return (
    <div
      className={`h-16 md:h-[72px] px-4 md:px-8 shadow-Shadows/shadow-sm md:[box-shadow:none] ${css.container} navigation`}
    >
      <div
        className="md:hidden w-10 h-10 p-2 rounded-default cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <Icon fontSize={24} name="menu-02" color={variables.color_grey_500} />
      </div>
      <div className="hidden md:block md:ml-20 w-[512px]">
        <Input
          id="search-input"
          name="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          onClick={() => setOpenSearchModal(true)}
          placeholder={searchPlaceholder}
          startIcon={<Icon fontSize={20} name="search-lg" color={variables.color_grey_500} />}
          autoComplete="off"
        />
      </div>
      {userIsLoggedIn && (
        <div className="flex w-fit h-10 gap-2 md:gap-4 items-center">
          <div className="flex gap-4 md:hidden mr-2" onClick={() => setOpenSearchModal(true)}>
            <Icon name="search-lg" fontSize={24} className="text-Gray-light-mode-500" />
          </div>
          <div onClick={readNotifications}>
            <NotifBellIcon unread={unreadNotif} />
          </div>
          <div className="hidden md:block h-full">
            <StatusDropDown
              type={userType}
              hiring={hiring}
              openToWork={openToWork}
              openToVolunteer={openToVolunteer}
              handleOpenToWork={handleOpenToWork}
              handleOpenToVolunteer={handleOpenToVolunteer}
              handleHiring={handleHiring}
            />
          </div>

          <IconDropDown
            type={userType}
            img={image}
            accounts={accounts}
            iconItems={[
              { iconName: 'user-circle', label: translate('header-view-profile'), onClick: navigateToProfile },
              { iconName: 'settings-01', label: translate('header-settings'), onClick: navigateToSettings },
              { iconName: 'log-out-01', label: translate('header-logout'), onClick: logout },
            ]}
            createItem
          />
        </div>
      )}

      <Overlay open={openNotifPanel} onClose={() => setOpenNotifPanel(false)} title="Notifications">
        <Notifications handleClose={() => setOpenNotifPanel(false)} list={notifList} />
      </Overlay>
      <SearchModal open={openSearchModal} onClose={() => setOpenSearchModal(false)} setSearchText={setSearchTerm} />
    </div>
  );
};

export default HeaderNavBar;

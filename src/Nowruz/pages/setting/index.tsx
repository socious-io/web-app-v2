import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
import Account from 'src/Nowruz/modules/settings/components/account/';
import Notification from 'src/Nowruz/modules/settings/components/notification';
import { OrgTeam } from 'src/Nowruz/modules/settings/components/orgTeam';
import Password from 'src/Nowruz/modules/settings/components/password';
import { UserTeam } from 'src/Nowruz/modules/settings/components/userTeam';
import { RootState } from 'src/store';

export const Setting = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((identity) => identity.current),
  );
  const tabs = [
    {
      label: 'Account',
      content: <Account />,
      default: true,
    },
    {
      label: 'Team',
      content: currentIdentity?.type === 'users' ? <UserTeam /> : <OrgTeam />,
    },
    {
      label: 'Password',
      content: <Password />,
    },
    {
      label: 'Notifications',
      content: <Notification />,
    },

    // {
    //   label: 'Working Prefrences',
    //   content: <h1>Working</h1>
    // },
    // {
    //   label: 'Notification',
    //   content: <h1>Notif</h1>
    // },
  ];
  const items: any[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Team', value: 'Team' },
    { label: 'Password', value: 'Password' },
    { label: 'Notifications', value: 'Notification' },
  ];

  const [content, setContent] = useState<ReactNode>();

  const setValue = (value) => {
    if (value.value === 'Account') return setContent(<Account />);
    if (value.value === 'Password') return setContent(<Password />);
    if (value.value === 'Notification') return setContent(<Notification />);
    if (value.value === 'Team' && currentIdentity?.type === 'users') return setContent(<UserTeam />);
    if (value.value === 'Team' && currentIdentity?.type === 'organizations') return setContent(<OrgTeam />);
  };

  useEffect(() => {
    setValue({ label: 'Account', value: 'Account' });
  }, []);

  return (
    <>
      <div className="container">
        <div className="w-full ">
          <div className="p-4 md:px-8">
            <h2 className="gap-5 text-3xl mb-6">Settings</h2>

            <div className="block md:hidden">
              <SearchDropdown
                required
                id="end-month"
                options={items}
                hasDropdownIcon
                onChange={(value) => {
                  setValue(value);
                }}
                className="flex-1"
              />

              <div className="mt-6">{content}</div>
            </div>

            <div className="hidden md:block">
              <HorizontalTabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

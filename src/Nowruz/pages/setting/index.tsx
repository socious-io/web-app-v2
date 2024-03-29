import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
import Account from 'src/Nowruz/modules/settings/components/account/';
import Notification from 'src/Nowruz/modules/settings/components/notification';
import Password from 'src/Nowruz/modules/settings/components/password';
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
      label: 'Password',
      content: <Password />,
    },

    // {
    //   label: 'Team',
    //   content: <h1>Team</h1>
    // },
    // {
    //   label: 'Working Prefrences',
    //   content: <h1>Working</h1>
    // },
    // {
    //   label: 'Notification',
    //   content: <h1>Notif</h1>
    // },
  ];
  if (currentIdentity?.type === 'users')
    tabs.push({
      label: 'Notifications',
      content: <Notification />,
    });

  const items: any[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Password', value: 'Password' },
  ];

  if (currentIdentity?.type === 'users') items.push({ label: 'Notifications', value: 'Notification' });
  const [content, setContent] = useState<ReactNode>();

  const setValue = (value) => {
    if (value.value === 'Account') return setContent(<Account />);
    if (value.value === 'Password') return setContent(<Password />);
    if (value.value === 'Notification') return setContent(<Notification />);
  };

  useEffect(() => {
    setValue({ label: 'Account', value: 'Account' });
  }, []);

  return (
    <>
      <div className="container">
        <div className="col-12">
          <div className="p-4">
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

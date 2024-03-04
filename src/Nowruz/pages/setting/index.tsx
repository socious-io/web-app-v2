import { useEffect, useState } from 'react';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
import Account from 'src/Nowruz/modules/settings/components/account/';
import Password from 'src/Nowruz/modules/settings/components/password';

export const Setting = () => {
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
  const items: any[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Password', value: 'Password' },
  ];

  const [content, setContent] = useState<ReactNode>();

  const setValue = (value) => {
    console.log('value', value);

    if (value.value === 'Account') return setContent(<Account />);
    if (value.value === 'Password') return setContent(<Password />);
  };

  useEffect(() => {
    setValue({ label: 'Account', value: 'Account' });
  }, []);

  return (
    <>
      <div className="container">
        <div className="col-12">
          <div className="p-4">
            <h1 className="text-gray-900 text-3xl font-semibold leading-7 p-4 mb-5">Settings</h1>

            <div className="block lg:hidden">
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

            <div className="hidden lg:block">
              <HorizontalTabs tabs={tabs} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

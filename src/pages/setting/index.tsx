import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { translate } from 'src/core/utils';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import Account from 'src/modules/settings/components/account/';
import Language from 'src/modules/settings/components/Language';
import Notification from 'src/modules/settings/components/notification';
import { OrgTeam } from 'src/modules/settings/components/orgTeam';
import Password from 'src/modules/settings/components/password';
import { Plan } from 'src/modules/settings/components/plan';
import { UserTeam } from 'src/modules/settings/components/userTeam';
import { RootState } from 'src/store';

export const Setting = () => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const tabs = [
    {
      label: translate('settings.tabs.account'),
      content: <Account />,
      default: true,
    },
    {
      label: translate('settings.tabs.team'),
      content: currentIdentity?.type === 'users' ? <UserTeam /> : <OrgTeam />,
    },
    {
      label: translate('settings.tabs.password'),
      content: <Password />,
    },

    // {
    //   label: 'Working Prefrences',
    //   content: <h1>Working</h1>
    // },
  ];

  if (currentIdentity?.type === 'organizations')
    tabs.push({
      label: translate('settings.tabs.plan'),
      content: <Plan />,
    });

  if (currentIdentity?.type === 'users')
    tabs.push({
      label: translate('settings.tabs.notifications'),
      content: <Notification />,
    });
  tabs.push({
    label: translate('settings.tabs.language'),
    content: <Language />,
  });
  const items: any[] = [
    { label: translate('settings.items.account'), value: 'Account' },
    { label: translate('settings.items.team'), value: 'Team' },
    { label: translate('settings.items.password'), value: 'Password' },
  ];

  if (currentIdentity?.type === 'organizations')
    items.push({
      label: translate('settings.items.plan'),
      value: 'Plan',
    });

  if (currentIdentity?.type === 'users')
    items.push({ label: translate('settings.items.notifications'), value: 'Notification' });
  items.push({ label: translate('settings.items.language'), value: 'Language' });
  const [content, setContent] = useState<ReactNode>();

  const setValue = value => {
    if (value.value === 'Account') return setContent(<Account />);
    if (value.value === 'Password') return setContent(<Password />);
    if (value.value === 'Notification') return setContent(<Notification />);
    if (value.value === 'Team' && currentIdentity?.type === 'users') return setContent(<UserTeam />);
    if (value.value === 'Team' && currentIdentity?.type === 'organizations') return setContent(<OrgTeam />);
    if (value.value === 'Plan') return setContent(<Plan />);
    if (value.value === 'Language') return setContent(<Language />);
  };

  useEffect(() => {
    setValue({ label: translate('settings.items.account'), value: 'Account' });
  }, []);

  return (
    <>
      <div className="container">
        <div className="w-full">
          <div className="p-4 md:px-8">
            <h2 className="gap-5 text-3xl mb-6">{translate('settings.title')}</h2>

            <div className="block md:hidden">
              <SearchDropdown
                required
                id="end-month"
                options={items}
                hasDropdownIcon
                onChange={value => {
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

import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import Account from 'src/modules/settings/components/account/';
import Notification from 'src/modules/settings/components/notification';
import { OrgTeam } from 'src/modules/settings/components/orgTeam';
import Password from 'src/modules/settings/components/password';
import { Plan } from 'src/modules/settings/components/plan';
import { UserTeam } from 'src/modules/settings/components/userTeam';
import { RootState } from 'src/store';
import { useTranslation } from 'react-i18next';

export const Setting = () => {
  const { t } = useTranslation('settings');
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const tabs = [
    {
      label: t('heading'),
      content: <Account />,
      default: true,
    },
    {
      label: t('team'),
      content: currentIdentity?.type === 'users' ? <UserTeam /> : <OrgTeam />,
    },
    {
      label: t('password'),
      content: <Password />,
    },

    // {
    //   label: 'Working Prefrences',
    //   content: <h1>Working</h1>
    // },
  ];

  if (currentIdentity?.type === 'organizations')
    tabs.push({
      label: 'Plan',
      content: <Plan />,
    });

  if (currentIdentity?.type === 'users')
    tabs.push({
      label: t('set_notificationsHeading'),
      content: <Notification />,
    });

  const items: any[] = [
    { label: 'Account', value: 'Account' },
    { label: 'Team', value: 'Team' },
    { label: 'Password', value: 'Password' },
  ];

  if (currentIdentity?.type === 'organizations')
    items.push({
      label: 'Plan',
      value: 'Plan',
    });

  if (currentIdentity?.type === 'users')
    items.push({ label: t('notificationsHeading'), value: t('notificationsHeading') });

  const [content, setContent] = useState<ReactNode>();

  const setValue = value => {
    if (value.value === 'Account') return setContent(<Account />);
    if (value.value === 'Password') return setContent(<Password />);
    if (value.value === 'Notification') return setContent(<Notification />);
    if (value.value === 'Team' && currentIdentity?.type === 'users') return setContent(<UserTeam />);
    if (value.value === 'Team' && currentIdentity?.type === 'organizations') return setContent(<OrgTeam />);
    if (value.value === 'Plan') return setContent(<Plan />);
  };

  useEffect(() => {
    setValue({ label: 'Account', value: 'Account' });
  }, []);

  return (
    <>
      <div className="container">
        <div className="w-full">
          <div className="p-4 md:px-8">
            <h2 className="gap-5 text-3xl mb-6">{t('page_title')}</h2>

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

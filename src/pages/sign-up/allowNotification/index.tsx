import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta, translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import { IconDropDown } from 'src/modules/general/components/iconDropDown';
import { RootState } from 'src/store';

import css from './allow-notification.module.scss';
import { useAllowNotification } from './useAllowNotification';

export const AllowNotification = () => {
  const { onAllowNotification, items, onSkip } = useAllowNotification();
  const identities = useSelector<RootState, CurrentIdentity[]>(state => {
    return state.identity.entities;
  });
  const primary = identities.find(i => i.primary);
  const { name, username, profileImage } = getIdentityMeta(primary);
  const accounts = [{ id: '1', type: 'users' as UserType, name, username, img: profileImage }];
  const type = localStorage.getItem('registerFor');

  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <div className="flex flex-row justify-between py-4 px-8 w-full">
        <img src="/images/logo/logo.svg" width={32} height={32} className="md:hidden" />
        <img src="/images/logo/logo-text.svg" className="hidden md:block" />
        <IconDropDown iconItems={items} type={type === 'user' ? 'users' : 'organizations'} accounts={accounts} />
      </div>
      <div className="flex flex-col h-screen justify-between">
        <div className="mt-20 text-center">
          <h1 className={css.title}>{translate('sign-up-notification-header')}</h1>
          <h2 className={css.subTitle}>{translate('sign-up-notification-subheader')}</h2>
        </div>
        <div className="flex flex-col justify-center items-center p-4">
          <FeaturedIcon iconName="bell-01" className="mb-5" />
          <p className={css.description}>{translate('sign-up-notification-desc')}</p>
        </div>
        <div className=" w-full p-4">
          <Button color="primary" block onClick={onAllowNotification}>
            {translate('sign-up-notification-allow')}
          </Button>
          <div className="mt-2">
            <Button color="secondary" variant="outlined" block onClick={onSkip}>
              {translate('sign-up-notification-skip')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

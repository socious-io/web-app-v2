import React from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity, Notification } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { IconDropDown } from 'src/Nowruz/modules/general/components/iconDropDown';
import { RootState } from 'src/store';

import css from './allow-notification.module.scss';
import { useAllowNotification } from './useAllowNotification';
export const AllowNotification = () => {
  const isMobile = isTouchDevice();
  const type = localStorage.getItem('registerFor');

  const { onAllowNotification, items, onSkip } = useAllowNotification();
  const identities = useSelector<RootState, CurrentIdentity[]>((state) => {
    return state.identity.entities;
  });
  const primary = identities.find((i) => i.primary);
  const accounts = [
    { id: '1', type: 'users', name: primary?.meta.name, username: primary?.meta.username, img: primary?.meta.avatar },
  ];

  return (
    <div className="flex flex-col h-screen justify-between items-center">
      <div className="flex flex-row justify-between py-4 px-8 w-full">
        <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} />
        <IconDropDown iconItems={items} type={type === 'user' ? 'users' : 'organizations'} accounts={accounts} />
      </div>
      <div className="flex flex-col h-screen justify-between">
        <div className="mt-20 text-center">
          <h1 className={css.title}>Stay up to date</h1>
          <h2 className={css.subTitle}>Turn on notifications to get updates</h2>
        </div>
        <div className="flex flex-col justify-center items-center p-4">
          <FeaturedIcon iconName="bell-01" className="mb-5" />
          <p className={css.description}>
            Get alerts for new messages, job updates, and the progress of your current tasks.
          </p>
        </div>
        <div className=" w-full p-4">
          <Button color="primary" block onClick={onAllowNotification}>
            Allow
          </Button>
          <div className="mt-2">
            <Button color="secondary" variant="outlined" block onClick={onSkip}>
              Skip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

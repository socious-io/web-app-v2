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

  const { onAllowNotification, items } = useAllowNotification();
  const identities = useSelector<RootState, CurrentIdentity[]>((state) => {
    return state.identity.entities;
  });
  const primary = identities.find((i) => i.primary);
  const accounts = [
    { id: '1', type: 'users', name: primary?.meta.name, username: primary?.meta.username, img: primary?.meta.avatar },
  ];

  return (
    <>
      <div className="flex flex-row justify-between py-4 px-8">
        <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} />
        <IconDropDown iconItems={items} type={type === 'user' ? 'users' : 'organizations'} accounts={accounts} />
      </div>
      <div className="flex flex-col items-center pb-4 ">
        <div className={`md:pt-9 px-4 ${css.container}`}>
          <div>
            <div className={css.header}>
              <div>
                <h1 className={css.title}>Stay up to date</h1>
              </div>
              <div>
                <h2 className={css.description}>Turn on notifications to get updates</h2>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-center items-center">
            <FeaturedIcon iconName="bell-01" className="mb-5" />
            <p className={css.description}>
              Get alerts for new messages, job updates, and the progress of your current tasks.
            </p>
          </div>
          <div className="fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-8 ">
            <Button color="primary" block onClick={onAllowNotification}>
              Allow
            </Button>
            <div className="mt-2">
              <Button color="secondary" variant="outlined" block>
                Skip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import { Button } from 'src/Nowruz/modules/general/components/Button';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import css from './credentials.module.scss';
import { useCredentials } from './useCredentials';
import { KYBModal } from 'src/Nowruz/modules/credentials/KYB';
import { TopBanner } from 'src/Nowruz/modules/general/components/topBanner';
import { Icon } from 'src/Nowruz/general/Icon';
import { useState } from 'react';

export const Credentials = () => {
  const { tabs, verified, setOpenVerifiyAlert, openVerifiyAlert } = useCredentials();
  const [displayVerifiedBanner, setDisplayVerifiedBanner] = useState(true);

  return (
    <>
      <div className="w-full flex flex-col">
        {!verified ? (
          <TopBanner
            theme="warning"
            primaryBtnLabel="Verify now"
            primaryBtnIcon={<Icon name="arrow-right" fontSize={20} className="text-Warning-700 p-0" />}
            primaryBtnAction={() => setOpenVerifiyAlert(true)}
            secondaryBtnLabel="Learn more"
            secondaryBtnLink="https://socious.io/verified-credentials"
            text="Verify your identity"
            supportingText="In order to claim your certificates, please verify your identity."
          />
        ) : displayVerifiedBanner ? (
          <TopBanner
            theme="success"
            text="Your identity has been verified"
            supportingText="You can now claim your certificates."
            secondaryBtnLabel="Dismiss"
            secondaryBtnAction={() => setDisplayVerifiedBanner(false)}
          />
        ) : (
          ''
        )}
        <div className={css.container}>
          <div className={css.header}>
            <div className={css.left}>
              <h1 className={css.title}>Credentials</h1>
              <h2 className={css.subtitle}>Here all credentials issued or requested</h2>
            </div>
            {/* <div className={css.hidden}>
              <Button color="primary" startIcon={<img src="/icons/plus.svg" alt="plus" style={{ width: '20px' }} />}>
                Issue a Credential
              </Button>
            </div> */}
          </div>
          <HorizontalTabs tabs={tabs} />
        </div>
      </div>
      {openVerifiyAlert && <KYBModal open={openVerifiyAlert} setOpen={setOpenVerifiyAlert} />}
    </>
  );
};

import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { TopBanner } from 'src/Nowruz/modules/general/components/topBanner';
import { TopBannerNotVerified } from 'src/Nowruz/modules/general/components/TopBannerNotVerified';

import css from './credentials.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const { tabs, verified, hideVerifyBanner, handleDismissVerified, type, activeTabIndex, verificationStatus } =
    useCredentials();

  return (
    <>
      <div className="w-full flex flex-col">
        {!verified && verificationStatus === 'PENDING' && (
          <TopBanner
            theme="warning"
            text="Verification pending"
            supportingText="We reviewing your submitted documents, we will notify you once it is complete."
          />
        )}
        {!verified && verificationStatus !== 'PENDING' && (
          <TopBannerNotVerified
            supportingText={
              type === 'users'
                ? 'In order to claim your certificates, please verify your identity.'
                : 'Get your organization verified to issue credentials.'
            }
          />
        )}
        {verified && !hideVerifyBanner && (
          <TopBanner
            theme="success"
            text="Your identity has been verified"
            supportingText="You can now claim your certificates."
            secondaryBtnLabel="Dismiss"
            secondaryBtnAction={handleDismissVerified}
          />
        )}

        <div className={css.container}>
          <div className={css.header}>
            <div className={css.left}>
              <h1 className={css.title}>Credentials</h1>
              <h2 className={css.subtitle}>Here all credentials issued or requested</h2>
            </div>
            {/* keep this for possible changes in near future */}
            {/* <div className={css.hidden}>
              <Button color="primary" startIcon={<img src="/icons/plus.svg" alt="plus" style={{ width: '20px' }} />}>
                Issue a Credential
              </Button>
            </div> */}
          </div>
          <HorizontalTabs tabs={tabs} activeIndex={activeTabIndex} />
        </div>
      </div>
    </>
  );
};

import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { TopBanner } from 'src/modules/general/components/topBanner';
import { TopBannerNotVerified } from 'src/modules/general/components/TopBannerNotVerified';
import { useTranslation } from 'react-i18next';

import css from './credentials.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const { t } = useTranslation('credentials');
  const { tabs, verified, hideVerifyBanner, handleDismissVerified, type, activeTabIndex, verificationStatus } =
    useCredentials();

  return (
    <>
      <div className="w-full flex flex-col">
        {!verified ? (
          verificationStatus === 'PENDING' && type === 'organizations' ? (
            <TopBanner
              theme="warning"
              text="Verification pending"
              supportingText="We reviewing your submitted documents, we will notify you once it is complete."
            />
          ) : (
            <TopBannerNotVerified
              supportingText={
                type === 'users' ? t('cred_verification_text') : 'Get your organization verified to issue credentials.'
              }
            />
          )
        ) : (
          ''
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
              <h1 className={css.title}>{t('cred_header')}</h1>
              <h2 className={css.subtitle}>{t('cred_info')}</h2>
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

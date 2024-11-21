import { translate } from 'src/core/utils';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';
import { TopBanner } from 'src/modules/general/components/topBanner';
import { TopBannerNotVerified } from 'src/modules/general/components/TopBannerNotVerified';

import css from './credentials.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const { tabs, verified, hideVerifyBanner, handleDismissVerified, type, activeTabIndex, verificationStatus } =
    useCredentials();

  return (
    <>
      <div className="w-full flex flex-col">
        {!verified ? (
          verificationStatus === 'PENDING' && type === 'organizations' ? (
            <TopBanner
              theme="warning"
              text={translate('cred-ver-pending')}
              supportingText={translate('cred-ver-pending-desc')}
            />
          ) : (
            <TopBannerNotVerified
              supportingText={type === 'users' ? translate('cred-verified-user') : translate('cred-verified-org')}
            />
          )
        ) : (
          ''
        )}

        {verified && !hideVerifyBanner && (
          <TopBanner
            theme="success"
            text={translate('cred-verified-banner')}
            supportingText={translate('cred-verified-banner-desc')}
            secondaryBtnLabel={translate('cred-dismiss')}
            secondaryBtnAction={handleDismissVerified}
          />
        )}

        <div className={css.container}>
          <div className={css.header}>
            <div className={css.left}>
              <h1 className={css.title}>{translate('cred-title')}</h1>
              <h2 className={css.subtitle}>{translate('cred-subtitle')}</h2>
            </div>
            {/* keep this for possible changes in near future */}
            {/* <div className={css.hidden}>
              <Button color="primary" startIcon={<Icon name="plus" fontSize={20} color="white" />}>
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

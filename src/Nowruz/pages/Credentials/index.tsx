import { Icon } from 'src/Nowruz/general/Icon';
import { KYBModal } from 'src/Nowruz/modules/credentials/KYB';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';
import { TopBanner } from 'src/Nowruz/modules/general/components/topBanner';
import { VerifyModal } from 'src/Nowruz/modules/refer/verifyModal';

import css from './credentials.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const { tabs, verified, setOpenVerifiyAlert, openVerifiyAlert, hideVerifyBanner, handleDismissVerified, type } =
    useCredentials();
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
            text={type === 'users' ? 'Verify your identity' : 'Verify your organization'}
            supportingText={
              type === 'users'
                ? 'In order to claim your certificates, please verify your identity.'
                : 'Get your organization verified to issue credentials.'
            }
          />
        ) : !hideVerifyBanner ? (
          <TopBanner
            theme="success"
            text="Your identity has been verified"
            supportingText="You can now claim your certificates."
            secondaryBtnLabel="Dismiss"
            secondaryBtnAction={handleDismissVerified}
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

      {type === 'users' ? (
        <VerifyModal open={openVerifiyAlert} handleClose={() => setOpenVerifiyAlert(false)} />
      ) : (
        <KYBModal open={openVerifiyAlert} setOpen={setOpenVerifiyAlert} />
      )}
    </>
  );
};

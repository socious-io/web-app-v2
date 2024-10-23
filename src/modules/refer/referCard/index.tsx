import React from 'react';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './referCard.module.scss';
import { useReferCard } from './useReferCard';
import EmailInvitation from '../emailInvitation';

interface ReferCardProps {
  type: 'organization' | 'talent';
}

export const ReferCard: React.FC<ReferCardProps> = ({ type }) => {
  const {
    openEmailModal,
    setOpenEmailModal,
    handleCopy,
    title,
    subtitle,
    verified,
    sendInviteEmail,
    url,
    emails,
    setEmails,
    openSentModal,
    setOpenSentModal,
  } = useReferCard(type);
  const inputJSX = (
    <button id="copy-button" className={css.copyBtn} onClick={handleCopy}>
      <Icon name="copy-01" fontSize={20} className="text-Gray-light-mode-700" />
      <span>{translate('referral-copy')}</span>
    </button>
  );
  return (
    <>
      <div
        className="flex-1 flex flex-col gap-6 rounded-xl"
        style={{
          backgroundColor: type === 'organization' ? variables.color_wild_blue_100 : variables.color_dark_vanilla_100,
        }}
      >
        <div className="flex flex-col gap-1 px-4 md:px-6 pt-5">
          <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">{title}</span>
          <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>
        </div>
        {!!verified && (
          <div className="py-5 px-4 md:p-6 flex flex-col gap-3">
            <Input className="bg-Base-White" id="copy-url" value={url} postfix={inputJSX} />
            <div className="w-full flex gap-3">
              {/* <Button
                fullWidth
                customStyle="bg-Base-White"
                variant="outlined"
                color="secondary"
                onClick={() => setOpenEmailModal(true)}
              >
                <Icon name="mail-01" fontSize={24} className="text-Gray-light-mode-700" />
              </Button>
              <Button fullWidth customStyle="bg-Base-White" variant="outlined" color="secondary">
                <Icon name="share-01" fontSize={24} className="text-Gray-light-mode-700" />
              </Button>
              <Button fullWidth customStyle="bg-Base-White" variant="outlined" color="secondary">
                <img src="/icons/nowruz/whatsapp.svg" />
              </Button>
              <Button fullWidth customStyle="bg-Base-White" variant="outlined" color="secondary">
                <img src="/icons/nowruz/telegram.svg" />
              </Button> */}
            </div>
          </div>
        )}
        <div
          className={`p-6 flex flex-col gap-3 border border-b-0 border-x-0 border-t border-solid ${
            type === 'organization' ? 'border-Wild_blue-500' : 'border-Dark_vanilla-500'
          } `}
        >
          <span className="text-lg font-semibold text-Gray-light-mode-900">{translate('referral-you-get')}</span>
          <div className="flex gap-3">
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor:
                  type === 'organization' ? variables.color_wild_blue_500 : variables.color_dark_vanilla_500,
              }}
            >
              <img src="/icons/nowruz/check.svg" alt="" />
            </div>
            <span className="text-sm font-normal text-Gray-light-mode-600">
              {type === 'organization' ? translate('referral-org-desc') : translate('referral-user-desc')}
            </span>
          </div>
          <span className="text-lg font-semibold text-Gray-light-mode-900">{translate('referral-they-get')}</span>
          <div className="flex gap-3">
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor:
                  type === 'organization' ? variables.color_wild_blue_500 : variables.color_dark_vanilla_500,
              }}
            >
              <img src="/icons/nowruz/check.svg" alt="" />
            </div>
            <span className="text-sm font-normal text-Gray-light-mode-600">{translate('referral-discount')}</span>
          </div>
        </div>
      </div>
      <EmailInvitation
        open={openEmailModal}
        handleClose={() => setOpenEmailModal(false)}
        handleSend={sendInviteEmail}
        emails={emails}
        setEmails={setEmails}
      />
      <AlertModal
        open={openSentModal}
        onClose={() => setOpenSentModal(false)}
        title={translate('referral-sent')}
        message={translate('referral-tell-contacts')}
        closeButtn={true}
        closeButtonLabel={translate('referral-close')}
      />
    </>
  );
};

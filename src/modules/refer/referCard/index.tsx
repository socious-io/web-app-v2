import React from 'react';
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
      <span>Copy</span>
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
          <div className="px-4 md:px-6 flex flex-col gap-3">
            <Input className="bg-Base-White" id="copy-url" value={url} postfix={inputJSX} />
            <div className="w-full flex gap-3">
              <Button
                fullWidth
                customStyle="bg-Base-White"
                variant="outlined"
                color="secondary"
                onClick={() => setOpenEmailModal(true)}
              >
                <Icon name="mail-01" fontSize={24} className="text-Gray-light-mode-700" />
              </Button>
              {/*<Button fullWidth customStyle="bg-Base-White" variant="outlined" color="secondary">
                <Icon name="share-01" fontSize={24} className="text-Gray-light-mode-700" />
              </Button>
              <Button fullWidth customStyle="bg-Base-White" variant="outlined" color="secondary">
                <Icon name="whatsapp" fontSize={24} color="#00c538" />
              </Button>
              <Button fullWidth customStyle="bg-Base-White" variant="outlined" color="secondary">
                <Icon name="telegram" fontSize={24} color="#26a5e5" />
              </Button> */}
            </div>
          </div>
        )}
        <div
          className={`p-6 flex flex-col gap-3 border border-b-0 border-x-0 border-t border-solid ${
            type === 'organization' ? 'border-Wild_blue-500' : 'border-Dark_vanilla-500'
          } `}
        >
          <span className="text-lg font-semibold text-Gray-light-mode-900">You get</span>
          <div className="flex gap-3">
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor:
                  type === 'organization' ? variables.color_wild_blue_500 : variables.color_dark_vanilla_500,
              }}
            >
              <Icon name="tick" fontSize={10} className="text-Base-White" />
            </div>
            <span className="text-sm font-normal text-Gray-light-mode-600">
              {type === 'organization'
                ? '1% of every invoice when your referral hires'
                : '1% of their earnings on Socious'}
            </span>
          </div>
          <span className="text-lg font-semibold text-Gray-light-mode-900">They get</span>
          <div className="flex gap-3">
            <div
              className="h-5 w-5 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor:
                  type === 'organization' ? variables.color_wild_blue_500 : variables.color_dark_vanilla_500,
              }}
            >
              <Icon name="tick" fontSize={10} className="text-Base-White" />
            </div>
            <span className="text-sm font-normal text-Gray-light-mode-600">
              50% discount on Socious fees for the first month
            </span>
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
        title="Sent"
        message="Tell your contacts to check their inbox. Their invite to Socious should be with them shortly."
        closeButtn={true}
        closeButtonLabel="Close"
      />
    </>
  );
};

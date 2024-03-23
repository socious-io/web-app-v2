import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Organization, User } from 'src/core/api';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { AvatarProfile } from 'src/Nowruz/modules/general/components/avatarProfile';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { useSearchResultProfile } from './useSearchResultProfile';

interface HeaderProps {
  identity?: User | Organization;
}
export const Header: React.FC<HeaderProps> = ({ identity }) => {
  const {
    name,
    profileImage,
    type,
    username,
    coverImageUrl,
    displayButton,
    buttonLabel,
    handleClick,
    openModal,
    setOpenModal,
    handleConnect,
    message,
    handleChangeMessage,
    error,
    letterCount,
  } = useSearchResultProfile(identity);
  return (
    <>
      <div
        className={`h-20 md:h-[120px] w-full bg-no-repeat bg-cover -z-10 rounded-t-xl`}
        style={{ backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
      />
      <div className="flex -mt-8 md:-mt-6  gap-6 pl-4 md:pl-6 pr-4 items-end">
        <AvatarProfile size="medium" imgUrl={profileImage} type={type} verified={false} />
        <div className="flex-grow flex justify-between items-start">
          <div className="hidden md:flex  flex-col">
            <div className="flex gap-3">
              <span className="font-semibold text-2xl text-Gray-light-mode-900">{name}</span>
              {!!(identity as User).open_to_work && (
                <Chip
                  label="Available for work"
                  size="lg"
                  theme="secondary"
                  startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                  shape="sharp"
                />
              )}
              {!!(identity as Organization).hiring && (
                <Chip
                  label="Hiring"
                  size="lg"
                  theme="secondary"
                  startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                  shape="sharp"
                />
              )}
            </div>
            <span className="text-base font-normal text-Gray-light-mode-600">{username}</span>
          </div>
          <div className="flex md:hidden flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-Gray-light-mode-900">{name}</span>
              <span className="text-base font-normal text-Gray-light-mode-600">{username}</span>
            </div>
            {!!(identity as User).open_to_work && (
              <Chip
                label="Available for work"
                size="lg"
                theme="secondary"
                startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                shape="sharp"
              />
            )}
            {!!(identity as Organization).hiring && (
              <Chip
                label="Hiring"
                size="lg"
                theme="secondary"
                startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                shape="sharp"
              />
            )}
          </div>
          {displayButton && (
            <Button
              variant="contained"
              color="primary"
              customStyle="mr-0 ml-auto"
              disabled={buttonLabel === 'Request sent'}
              onClick={handleClick}
            >
              {buttonLabel}
            </Button>
          )}
        </div>
      </div>
      <AlertModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Send a connection request"
        message="Add a message to your connection request"
        customIcon={<FeaturedIcon iconName="user-plus-01" size="lg" theme="gray" type="modern" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel="Send"
        onSubmit={handleConnect}
        disableSubmitButton={message.replaceAll(' ', '').length === 0}
      >
        <div className="w-full mb-6 flex flex-col gap-[6px]">
          <Input
            id="connect-message"
            label=""
            value={message}
            onChange={(e) => handleChangeMessage(e.target.value)}
            multiline
            customHeight="180px"
            placeholder="Enter a description..."
            fullWidth
            errors={error ? [error] : undefined}
          />
          <Typography variant="caption" className="text-Gray-light-mode-600 mr-0 ml-auto">
            {`${letterCount}/300`}
          </Typography>
        </div>
      </AlertModal>
    </>
  );
};

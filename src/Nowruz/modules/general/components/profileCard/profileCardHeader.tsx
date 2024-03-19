import React from 'react';

import { AvatarProfile } from '../avatarProfile';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { Dot } from '../dot';
import variables from 'src/components/_exports.module.scss';
import { Button } from '../Button';

interface ProfileCardHeaderProps {
  name: string;
  username: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  type?: 'users' | 'organizations';
  connectFlow?: boolean;
  openToWork?: boolean;
  hiring?: boolean;
}

export const ProfileCardHeader: React.FC<ProfileCardHeaderProps> = ({
  name,
  type,
  username,
  profileImageUrl,
  coverImageUrl,
  openToWork,
  hiring,
  connectFlow,
}) => {
  return (
    <div className="flex flex-col">
      <div
        className={`h-40 w-full bg-no-repeat bg-cover -z-10 rounded-t-xl`}
        style={{ backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
      />
      <div className="w-full  -mt-9 md:-mt-10 z-0 flex flex-col px-5 md:flex-row md:items-end md:gap-6 md:px-6 gap-4 ">
        <AvatarProfile size="medium" imgUrl={profileImageUrl} type={type} verified={false} />
        <div className="flex flex-1 justify-between items-end">
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <span className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">{name}</span>
              {type === 'users' && openToWork && (
                <Chip
                  label="Available for work"
                  size="lg"
                  theme="secondary"
                  startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                  shape="sharp"
                />
              )}
              {type === 'organizations' && hiring && (
                <Chip
                  label="Hiring"
                  size="lg"
                  theme="secondary"
                  startIcon={<Dot color={variables.color_success_500} size="small" shadow={false} />}
                  shape="sharp"
                />
              )}
            </div>

            <span className="text-md font-normal text-Gray-light-mode-600">{username}</span>
          </div>
          {connectFlow && (
            <Button color="primary" variant="contained">
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';

import { AvatarProfile } from '../avatarProfile';
import { Button } from '../Button';
import { useNavigate } from 'react-router-dom';

interface ProfileCardHeaderProps {
  name: string;
  bio: string;
  profileImageUrl?: string;
  coverImageUrl?: string;
  type?: 'users' | 'organizations';
  rounded?: boolean;
  myProfile: boolean;
  username: string;
}

export const ProfileCardHeader: React.FC<ProfileCardHeaderProps> = ({
  name,
  type,
  bio,
  profileImageUrl,
  coverImageUrl,
  rounded = true,
  myProfile,
  username,
}) => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    const usernameVal = username.replaceAll('@', '');
    if (username) {
      if (type === 'users') navigate(`/profile/users/${usernameVal}/view`);
      else navigate(`/profile/organizations/${usernameVal}/view`);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`h-20 w-full bg-no-repeat bg-cover -z-10 ${rounded ? 'rounded-t-xl' : ''} `}
        style={{ backgroundImage: coverImageUrl ? `url(${coverImageUrl})` : 'linear-gradient(#ace0f9, #fff1eb)' }}
      />
      <div className="w-full -mt-8 z-0 flex flex-col px-5 md:px-6 gap-4 md:gap-5">
        <AvatarProfile size="small" imgUrl={profileImageUrl} type={type} verified={false} />
        <div className="flex flex-col gap-1">
          <span className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">{name}</span>
          {myProfile && <span className="text-base font-normal text-Gray-light-mode-600">{username}</span>}
        </div>
        {myProfile && (
          <div className="mb-3 flex gap-3">
            <Button variant="contained" color="primary" onClick={navigateToProfile}>
              View profile
            </Button>
            {/* <Button variant="outlined" color="secondary">
              Edit profile
            </Button> */}
          </div>
        )}
        <span className="text-base font-normal leading-6 text-Gray-light-mode-600">{bio}</span>
      </div>
    </div>
  );
};

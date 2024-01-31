import React from 'react';
import { Organization, User } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { Location } from 'src/Nowruz/modules/userProfile/components/location';
import { Website } from 'src/Nowruz/modules/userProfile/components/website';

import { ProfileCardHeader } from './profileCardHeader';
import { Chip } from '../Chip';

interface ProfileCardProps {
  identity?: User | Organization;
}
const ProfileCard: React.FC<ProfileCardProps> = ({ identity }) => {
  const { name, profileImage, type, website } = getIdentityMeta(identity);
  if (!identity) return;
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{`About ${name}`}</span>
      <div className="flex flex-col border border-solid border-Gray-light-mode-200 rounded-xl">
        <ProfileCardHeader
          name={name}
          type={type}
          bio={identity.bio || ''}
          profileImageUrl={profileImage?.url}
          coverImageUrl={identity.cover_image?.url}
        />
        <div className="flex flex-col gap-5 md:gap-6 p-5 md:p-6">
          <div className="flex gap-2 flex-wrap">
            {identity.social_causes?.map((item) => (
              <Chip key={item} label={item} theme="primary" shape="round" size="md" />
            ))}
          </div>
          {identity.country && (
            <Location country={identity?.country} city={identity?.city} iconName={identity?.country} />
          )}
          {website && <Website url={website} />}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

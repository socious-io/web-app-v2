import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Organization, User } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { Location } from 'src/Nowruz/modules/userProfile/components/location';
import { Website } from 'src/Nowruz/modules/userProfile/components/website';

import { ProfileCardHeader } from './profileCardHeader';
import { ChipList } from '../chipList';

interface ProfileCardProps {
  identity?: User | Organization;
  labelShown?: boolean;
}
const ProfileCard: React.FC<ProfileCardProps> = ({ identity, labelShown = true }) => {
  const { name, profileImage, type, website } = getIdentityMeta(identity);
  const socialCauses = socialCausesToCategory(identity?.social_causes).map((item) => item.label);
  if (!identity) return;
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {labelShown && (
        <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{`About ${name}`}</span>
      )}
      <div className="flex flex-col border border-solid border-Gray-light-mode-200 rounded-xl">
        <ProfileCardHeader
          name={name}
          type={type}
          bio={identity.bio || ''}
          profileImageUrl={profileImage}
          coverImageUrl={identity.cover_image?.url}
        />
        <div className="flex flex-col gap-5 md:gap-6 p-5 md:p-6">
          <div className="flex gap-2 flex-wrap">
            <ChipList
              items={socialCauses}
              bgColor={variables.color_primary_50}
              borderColor={variables.color_primary_200}
              fontColor={variables.color_primary_700}
            />
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

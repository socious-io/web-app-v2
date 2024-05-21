import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import variables from 'src/components/_exports.module.scss';
import { socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta } from 'src/core/utils';
import { Location } from 'src/Nowruz/modules/userProfile/components/location';
import { Website } from 'src/Nowruz/modules/userProfile/components/website';
import { RootState } from 'src/store';

import { ProfileCardHeader } from './profileCardHeader';
import { Button } from '../Button';
import { ChipList } from '../chipList';

interface ProfileCardProps {
  identity?: User | Organization;
  labelShown?: boolean;
  rounded?: boolean;
  onProfileCardClick?: () => void;
}
const ProfileCard: React.FC<ProfileCardProps> = ({
  identity,
  labelShown = true,
  rounded = true,
  onProfileCardClick,
}) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const myProfile = currentIdentity?.id === identity?.id;
  const navigate = useNavigate();
  const { name, profileImage, type, website, username } = getIdentityMeta(identity);
  const socialCauses = socialCausesToCategory(identity?.social_causes).map(item => item.label);
  if (!identity) return;
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {labelShown && (
        <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{`About ${name}`}</span>
      )}
      <div
        className={`flex flex-col border border-solid border-Gray-light-mode-200 ${rounded ? 'rounded-xl' : ''} ${
          onProfileCardClick && 'cursor-pointer'
        }`}
        onClick={onProfileCardClick}
      >
        <ProfileCardHeader
          name={name}
          type={type as UserType}
          bio={identity.bio || ''}
          profileImageUrl={profileImage}
          coverImageUrl={identity.cover_image?.url}
          rounded={rounded}
          myProfile={myProfile}
          username={username}
        />
        <div className="flex flex-col gap-5 md:gap-6 p-5 md:p-6">
          {myProfile && (
            <div className="flex gap-4">
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate('/connections?active=0')}
              >{`${identity.connections} connections`}</Button>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate('/connections?active=2')}
              >{`${identity.followers} followers`}</Button>
            </div>
          )}
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

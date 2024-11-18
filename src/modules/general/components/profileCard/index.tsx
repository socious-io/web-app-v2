import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { eventsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { UserType } from 'src/core/types';
import { getIdentityMeta, translate } from 'src/core/utils';
import { Location } from 'src/modules/userProfile/components/location';
import { Website } from 'src/modules/userProfile/components/website';
import { RootState } from 'src/store';
import variables from 'src/styles/constants/_exports.module.scss';

import { ProfileCardHeader } from './profileCardHeader';
import { Button } from '../Button';
import { ChipList } from '../chipList';

interface ProfileCardProps {
  identity?: User | Organization;
  labelShown?: boolean;
  rounded?: boolean;
}
const ProfileCard: React.FC<ProfileCardProps> = ({ identity, labelShown = true, rounded = true }) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state =>
    state.identity.entities.find(identity => identity.current),
  );
  const myProfile = currentIdentity?.id === identity?.id;
  const navigate = useNavigate();
  const { name, profileImage, type, website, username } = getIdentityMeta(identity);
  const socialCauses = socialCausesToCategory(identity?.social_causes).map(item => translate(item.value));
  if (!identity) return;
  const events = eventsToCategory((identity as User).events || []).map(item => item.label);
  return (
    <div className="flex flex-col gap-5 md:gap-6 h-full w-full">
      {labelShown && (
        <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">
          {translate('job-about-company', { name: name })}
        </span>
      )}
      <div
        className={`h-full flex flex-col border border-solid border-Gray-light-mode-200 ${rounded ? 'rounded-xl' : ''}`}
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
              <Button variant="text" color="primary" onClick={() => navigate('/connections?active=0')}>
                {translate('profile-connection-number', { number: identity.connections })}
              </Button>
              <Button variant="text" color="primary" onClick={() => navigate('/connections?active=2')}>
                {translate('profile-follower-number', { number: identity.followers })}
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-2">
            <ChipList
              items={socialCauses}
              bgColor={variables.color_primary_50}
              borderColor={variables.color_primary_200}
              fontColor={variables.color_primary_700}
            />
            {type === 'users' && !!events.length && (
              <ChipList
                items={events}
                bgColor={variables.color_purple_50}
                borderColor={variables.color_purple_200}
                fontColor={variables.color_purple_700}
              />
            )}
          </div>
          {identity.country && (
            <Location country={identity?.country} city={identity?.city} iconName={identity?.country} />
          )}
          {website && <Website url={website} truncate />}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

import React from 'react';
import { eventsToCategory, skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { Organization, User } from 'src/core/api';
import { ChipList } from 'src/modules/general/components/chipList';
import { Icon } from 'src/modules/general/components/Icon';
import { Location } from 'src/modules/userProfile/components/location';
import { Website } from 'src/modules/userProfile/components/website';
import variables from 'src/styles/constants/_exports.module.scss';

import { Header } from './header';
import { useSearchResultProfile } from './useSearchResultProfile';

interface SearchResultProfileProps {
  identity?: User | Organization;
}

export const SearchResultProfile: React.FC<SearchResultProfileProps> = ({ identity }) => {
  const { type, website } = useSearchResultProfile(identity);
  const socialCauses = socialCausesToCategory(identity?.social_causes).map(item => item.label);
  const skills = skillsToCategory((identity as User)?.skills || []).map(item => item.label);
  const events = eventsToCategory((identity as User)?.events || []).map(item => item.label);
  return (
    <div className="flex flex-col rounded-xl border border-solid border-Gray-light-mode-200">
      <div onClick={e => e.stopPropagation()}>
        <Header identity={identity} />
      </div>
      <div className="py-6 px-4 md:px-6 flex flex-col gap-5">
        {identity?.bio && (
          <span className="text-base font-normal leading-6 text-Gray-light-mode-700">{identity?.bio}</span>
        )}
        <div className="flex flex-col gap-2">
          <ChipList
            items={socialCauses}
            bgColor={variables.color_primary_50}
            borderColor={variables.color_grey_200}
            fontColor={variables.color_primary_700}
          />

          {type === 'users' && !!skills.length && (
            <ChipList
              items={skills}
              bgColor={variables.color_grey_blue_50}
              borderColor={variables.color_grey_blue_200}
              fontColor={variables.color_grey_blue_700}
            />
          )}

          {type === 'users' && !!events.length && (
            <ChipList
              items={events}
              bgColor={variables.color_purple_50}
              borderColor={variables.color_purple_200}
              fontColor={variables.color_purple_700}
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          {(identity as User).open_to_volunteer && (
            <div className="flex gap-2">
              <Icon name="heart-filled" fontSize={20} className="text-Burgundy-600" />
              <span className="font-medium text-base leading-6 text-Gray-light-mode-700">Open to volunteer</span>
            </div>
          )}
          {identity?.country && (
            <Location country={identity?.country} city={identity?.city} iconName={identity?.country} />
          )}
          {website && <Website url={website} truncate />}
        </div>
      </div>
    </div>
  );
};

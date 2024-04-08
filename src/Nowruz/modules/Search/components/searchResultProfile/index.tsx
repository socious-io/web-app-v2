import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Organization, User } from 'src/core/api';
import { ChipList } from 'src/Nowruz/modules/general/components/chipList';
import { Location } from 'src/Nowruz/modules/userProfile/components/location';
import { Website } from 'src/Nowruz/modules/userProfile/components/website';

import { Header } from './header';
import { useSearchResultProfile } from './useSearchResultProfile';

interface SearchResultProfileProps {
  identity?: User | Organization;
}

export const SearchResultProfile: React.FC<SearchResultProfileProps> = ({ identity }) => {
  const { website } = useSearchResultProfile(identity);
  const socialCauses = socialCausesToCategory(identity?.social_causes).map((item) => item.label);
  return (
    <div className="flex flex-col rounded-xl border border-solid border-Gray-light-mode-200">
      <Header identity={identity} />
      <div className="py-6 px-4 md:px-6 flex flex-col gap-5">
        <span className="text-base font-normal leading-6 text-Gray-light-mode-700">{identity?.bio}</span>
        <div className="flex gap-2 flex-wrap">
          <ChipList
            items={socialCauses}
            bgColor={variables.color_primary_50}
            borderColor={variables.color_grey_200}
            fontColor={variables.color_primary_700}
          />
        </div>
        <div className="flex flex-col gap-3">
          {(identity as User).open_to_volunteer && (
            <div className="flex gap-2">
              <img src="/icons/nowruz/red-heart.svg" alt="" />
              <span className="font-medium text-base leading-6 text-Gray-light-mode-700">Open to volunteer</span>
            </div>
          )}
          {identity?.country && (
            <Location country={identity?.country} city={identity?.city} iconName={identity?.country} />
          )}
          {website && <Website url={website} />}
        </div>
      </div>
    </div>
  );
};

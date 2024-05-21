import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { ORGANIZATION_SIZE } from 'src/constants/ORGANIZATION_SIZE';
import { socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { ChipList } from 'src/Nowruz/modules/general/components/chipList';
import { Link } from 'src/Nowruz/modules/general/components/link';
import { RootState } from 'src/store';

import css from './mainInfo.module.scss';
import { Impact } from '../impact';
import { LanguageJSX } from '../languages';
import { Location } from '../location';
import { Website } from '../website';

export const MainInfo = () => {
  const identity = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  });

  const profileType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const myProfile = currentIdentity?.id === identity?.id;
  const org = identity as Organization;
  const user = identity as User;
  const size = ORGANIZATION_SIZE.find(sizes => sizes.value === org.size)?.label.split(' ')[0];
  const socialCauses = socialCausesToCategory(identity?.social_causes).map(item => item.label);
  const bioJSX = (
    <div>
      <Typography className={css.textMd}>{identity?.bio}</Typography>
    </div>
  );

  const renderData = (title: string, iconName: string, value: string) => {
    return (
      <div className="flex flex-col gap-2">
        <Typography variant="subtitle1" className="text-Gray-light-mode-600">
          {title}
        </Typography>
        <div className="flex gap-2">
          <Icon name={iconName} fontSize={20} color={variables.color_grey_500} />
          <Typography variant="h6" className="text-Gray-light-mode-700">
            {value}
          </Typography>
        </div>
      </div>
    );
  };

  const connectionJSX = (
    <div className="flex gap-2">
      <Link
        href="/connections?active=0"
        label={`${identity?.connections} connections`}
        customStyle={`${css.textSM} text-brand-700`}
      />
      <Link
        href="/connections?active=2"
        label={`${identity?.followers} followers`}
        customStyle={`${css.textSM} text-brand-700`}
      />
    </div>
  );
  return (
    <div className="flex flex-col gap-6">
      {profileType === 'users' && <Impact point={identity?.impact_points} myProfile={myProfile} />}
      {identity?.bio && bioJSX}
      {connectionJSX}
      <ChipList
        items={socialCauses}
        bgColor={variables.color_primary_50}
        borderColor={variables.color_primary_200}
        fontColor={variables.color_primary_700}
      />
      {profileType === 'users' && (identity as User).open_to_volunteer && (
        <div className="flex gap-2">
          <img src="/icons/nowruz/red-heart.svg" alt="" />
          <span className="font-medium text-base leading-6 text-Gray-light-mode-700">Open to volunteer</span>
        </div>
      )}
      {identity?.country && <Location country={identity.country} city={identity?.city} iconName={identity?.country} />}
      {profileType === 'users' && user.languages && <LanguageJSX items={user.languages || []} />}
      {org.industry && renderData('Industry', 'globe-04', org.industry)}
      {size && renderData('Size', 'users-01', size)}
      {org.website && <Website url={org.website ?? ''} truncate />}
    </div>
  );
};

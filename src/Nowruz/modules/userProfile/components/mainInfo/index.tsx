import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, Organization, User } from 'src/core/api';
import { ChipList } from 'src/Nowruz/modules/general/components/chipList';
import { Link } from 'src/Nowruz/modules/general/components/link';
import { RootState } from 'src/store';

import css from './mainInfo.module.scss';
import { Impact } from '../impact';
import { LanguageJSX } from '../languages';
import { Location } from '../location';
import { Website } from '../website';

export const MainInfo = () => {
  const identity = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  });

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === identity?.id;
  const type = currentIdentity?.type;

  const socialCauses = socialCausesToCategory(identity?.social_causes).map((item) => item.label);
  const bioJSX = (
    <div>
      <Typography className={css.textMd}>{identity?.bio}</Typography>
    </div>
  );

  const connectionJSX = (
    <div className="flex gap-2">
      <Link href="" label={`${identity?.followings} connections`} customStyle={`${css.textSM} text-brand-700`} />
      <Link href="" label={`${identity?.followers} followers`} customStyle={`${css.textSM} text-brand-700`} />
    </div>
  );
  return (
    <div className="flex flex-col gap-6">
      {type === 'users' && <Impact point={identity?.impact_points} myProfile={myProfile} />}
      {identity?.bio && bioJSX}
      {connectionJSX}
      <ChipList
        items={socialCauses}
        bgColor={variables.color_primary_50}
        borderColor={variables.color_primary_200}
        fontColor={variables.color_primary_700}
      />
      <Location country={identity?.country} city={identity?.city} iconName={identity?.country} />
      {type === 'users' && (identity as User).languages && <LanguageJSX items={(identity as User).languages || []} />}
      {(identity as Organization).website && <Website website={(identity as Organization).website ?? ''} />}
    </div>
  );
};

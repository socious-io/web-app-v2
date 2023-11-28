import { Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { socialCausesToCategory } from 'src/core/adaptors';
import { User } from 'src/core/api';
import { ChipList } from 'src/Nowruz/modules/general/components/chipList';
import { Link } from 'src/Nowruz/modules/general/components/link';

import css from './mainInfo.module.scss';
import { Impact } from '../impact';
import { LanguageJSX } from '../languages';
import { Location } from '../location';
interface MainInfoProps {
  user: User;
  myProfile: boolean;
}
export const MainInfo: React.FC<MainInfoProps> = ({ user, myProfile }) => {
  const socialCauses = socialCausesToCategory(user.social_causes).map((item) => item.label);
  const bioJSX = (
    <div>
      <Typography className={css.textMd} color={variables.color_gray_700}>
        {user.bio}
      </Typography>
    </div>
  );

  const connectionJSX = (
    <div className="flex gap-2">
      <Link href="" label={`${user.followings} connections`} customStyle={`${css.textSM} text-brand-700`} />
      <Link href="" label={`${user.followers} followers`} customStyle={`${css.textSM} text-brand-700`} />
    </div>
  );
  return (
    <div className="flex flex-col gap-6">
      <Impact point={user.impact_points} myProfile={myProfile} />
      {user.bio && bioJSX}
      {connectionJSX}
      <ChipList items={socialCauses} />
      <Location country={user.country} city={user.city} iconName={user.country} />
      {user.languages && <LanguageJSX items={user.languages} />}
    </div>
  );
};

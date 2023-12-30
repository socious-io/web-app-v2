import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { socialCausesToCategory } from 'src/core/adaptors';
import { CurrentIdentity, User } from 'src/core/api';
import { ChipList } from 'src/Nowruz/modules/general/components/chipList';
import { Link } from 'src/Nowruz/modules/general/components/link';
import { RootState } from 'src/store';

import css from './mainInfo.module.scss';
import { Impact } from '../impact';
import { LanguageJSX } from '../languages';
import { Location } from '../location';

export const MainInfo = () => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  const socialCauses = socialCausesToCategory(user?.social_causes).map((item) => item.label);
  const bioJSX = (
    <div>
      <Typography className={css.textMd} color={variables.color_gray_700}>
        {user?.bio}
      </Typography>
    </div>
  );

  const connectionJSX = (
    <div className="flex gap-2">
      <Link href="" label={`${user?.followings} connections`} customStyle={`${css.textSM} text-brand-700`} />
      <Link href="" label={`${user?.followers} followers`} customStyle={`${css.textSM} text-brand-700`} />
    </div>
  );
  return (
    <div className="flex flex-col gap-6">
      <Impact point={user?.impact_points} myProfile={myProfile} />
      {user?.bio && bioJSX}
      {connectionJSX}
      <ChipList
        items={socialCauses}
        bgColor={variables.color_primary_50}
        borderColor={variables.color_primary_200}
        fontColor={variables.color_primary_700}
      />
      <Location country={user?.country} city={user?.city} iconName={user?.country} />
      {user?.languages && <LanguageJSX items={user?.languages} />}
    </div>
  );
};

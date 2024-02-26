import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import variables from 'src/components/_exports.module.scss';
import { CurrentIdentity, UserMeta } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { RootState } from 'src/store';

import css from './impact.module.scss';
import { ImpactProps } from './impact.types';

export const Impact: React.FC<ImpactProps> = (props) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const user = currentIdentity?.meta as UserMeta;
  const { point = 0, myProfile } = props;
  const navigate = useNavigate();
  const navigateToImpact = () => {
    navigate(`/profile/users/${user.username}/impact`);
  };

  return (
    <div className={css.container}>
      <div className={css.titleDiv}>
        <div className={css.title}>Impact points</div>
        <Icon name="help-circle" fontSize={16} color={variables.color_grey_400} />
      </div>
      {myProfile && <div className={css.helperText}>Measure and track your impact</div>}
      <div className="flex items-end">
        <span className={css.pointNumber}>{point}</span>
        <span className={css.pointUnit}>pts</span>
      </div>
      {myProfile && (
        <Button fullWidth variant="outlined" color="secondary" className={css.button} onClick={navigateToImpact}>
          <Icon name="star-06" fontSize={20} color={variables.color_grey_700} />
          See my impact
        </Button>
      )}
    </div>
  );
};

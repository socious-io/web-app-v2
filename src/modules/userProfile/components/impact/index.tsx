import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CurrentIdentity, UserMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { RootState } from 'src/store';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './impact.module.scss';
import { ImpactProps } from './impact.types';

export const Impact: React.FC<ImpactProps> = props => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const user = currentIdentity?.meta as UserMeta;
  const { point = 0, myProfile, customContainerStyle } = props;
  const navigate = useNavigate();
  const navigateToImpact = () => {
    navigate(`/profile/users/${user.username}/impact`);
  };

  return (
    <div className={`${css.container} ${customContainerStyle}`}>
      <div className={css.titleDiv}>
        <div className={css.title}>{translate('dashboard-impact-points')}</div>
      </div>
      {myProfile && <div className={css.helperText}>{translate('dashboard-impact-measure')}</div>}
      <div className="flex items-end mb-4">
        <span className={css.pointNumber}>{Math.round(point)}</span>
        <span className={css.pointUnit}>pts</span>
      </div>
      {myProfile && (
        <Button fullWidth variant="outlined" color="secondary" className={css.button} onClick={navigateToImpact}>
          <Icon name="star-06" fontSize={20} color={variables.color_grey_700} />
          {translate('dashboard-impact-see')}
        </Button>
      )}
    </div>
  );
};

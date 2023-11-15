import React from 'react';
import { Icon } from 'src/Nowruz/general/Icon';
import css from './impact.module.scss';
import variables from 'src/components/_exports.module.scss';
import { ImpactProps } from './impact.types';
import { Button } from 'src/Nowruz/modules/general/components/Button';

export const Impact: React.FC<ImpactProps> = (props) => {
  const { point = 0 } = props;
  return (
    <div className={css.container}>
      <div className={css.titleDiv}>
        <div className={css.title}>Impact points</div>
        <Icon name="help-circle" fontSize={16} color={variables.color_grey_400} />
      </div>
      <div className={css.helperText}>Measure and track your impact</div>
      <div className="flex items-center mb-5">
        <div className={css.pointNumber}>{point}</div>
        <div className={css.pointUnit}>pts</div>
      </div>
      <Button fullWidth variant="outlined" color="secondary" className={css.button}>
        <Icon name="star-06" fontSize={20} color={variables.color_grey_700} />
        See my impact
      </Button>
    </div>
  );
};

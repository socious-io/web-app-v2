import { Divider, Typography } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './stepperCard.module.scss';
import { StepperCardProps } from './stepperCard.types';

export const StepperCard: React.FC<StepperCardProps> = (props) => {
  const { title, subtitle, iconName, supprtingText, editable, deletable, description, seeMore } = props;

  return (
    <div className="flex gap-3 h-full">
      <div className="hidden md:flex flex-col w-fit gap-1">
        <Avatar iconName={iconName} type="users" />

        <div className="w-1/2 flex-1 ">
          <Divider orientation="vertical" />
        </div>
      </div>
      <div className="relative flex flex-col w-full">
        <div className="absolute top-0 right-0 h-fit w-fit flex">
          {editable && (
            <button className={css.action}>
              <Icon name="pencil-01" fontSize={20} color={variables.color_grey_600} />
            </button>
          )}
          {deletable && (
            <button className={css.action}>
              <Icon name="trash-01" fontSize={20} color={variables.color_grey_600} />
            </button>
          )}
        </div>
        <div className="block md:hidden mb-3">
          <Avatar fontSize={48} iconName={iconName} type="users" />
        </div>
        <div className="pt-1 pb-6">
          <Typography variant="h4" color={variables.color_grey_900}>
            {title}
          </Typography>
          <Typography variant="h5" color={variables.color_grey_600}>
            {subtitle}
          </Typography>
          <Typography variant="h5" color={variables.color_grey_600}>
            {supprtingText}
          </Typography>
        </div>
        <div className="mb-5">
          <Typography variant="h5" color={variables.color_grey_600}>
            {description}
          </Typography>
        </div>
        {seeMore && (
          <div className="mb-5">
            <Button variant="text" color="primary" className={css.seeMoreBtn}>
              See more
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

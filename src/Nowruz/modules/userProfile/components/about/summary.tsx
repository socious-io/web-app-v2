import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './about.module.scss';

interface SummaryProps {
  description?: string;
  myProfile: boolean;
}
export const Summary: React.FC<SummaryProps> = ({ description, myProfile }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className={css.title}>
        Summary
        {myProfile && (
          <div className={css.editBtn}>
            <Icon name="pencil-01" color={variables.color_grey_600} fontSize={20} />
          </div>
        )}
      </div>
      <div>{description}</div>
    </div>
  );
};

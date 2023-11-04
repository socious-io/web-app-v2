import { Typography } from '@mui/material';
import variables from 'src/components/_exports.module.scss';

import { FormCheckProps } from './FormCheck.types';

export const FormCheck: React.FC<FormCheckProps> = (props) => {
  const { passCondition, label } = props;
  return (
    <div className="flex flex-row gap-2">
      {passCondition ? (
        <img src="/icons/nowruz/check-circle-green.svg" alt="" />
      ) : (
        <img src="/icons/nowruz/check-circle-grey.svg" alt="" />
      )}
      <Typography variant="caption" color={variables.color_grey_600}>
        {label}
      </Typography>
    </div>
  );
};

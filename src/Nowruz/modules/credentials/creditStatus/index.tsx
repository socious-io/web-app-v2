import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import { statusType } from './status.types';
import { Chip } from '../../general/components/Chip';

export const CreditStatus = (props: statusType) => {
  const { theme, icon, label } = props;
  const iconColor = {
    primary: variables.color_primary_500,
    success: variables.color_success_500,
    error: variables.color_error_500,
    warning: variables.color_warning_500,
    secondary: variables.color_grey_500,
  };

  return (
    <>
      <Chip
        startIcon={<Icon name={icon} color={iconColor[theme]} fontSize={12} />}
        label={label}
        shape="round"
        theme={theme}
        size="sm"
      />
    </>
  );
};

import { Icon } from 'src/Nowruz/general/Icon';
import variables from 'src/components/_exports.module.scss';
import css from './creditStatus.module.scss';
import { statusType } from './status.types';
import { Chip } from '../../general/components/Chip';

export const CreditStatus = (props: statusType) => {
  const { theme, icon, label } = props;
  const iconColoe =
    theme === 'primary'
      ? variables.color_primary_500
      : theme === 'success'
        ? variables.color_success_500
        : theme === 'error'
          ? variables.color_error_500
          : theme === 'warning'
            ? variables.color_warning_500
            : theme === 'secondary'
              ? variables.color_grey_500
              : '';
  return (
    <>
      <Chip
        startIcon={<Icon name={icon} color={iconColoe} fontSize={12} />}
        label={label}
        shape="round"
        theme={theme}
        size="sm"
      />
    </>
  );
};

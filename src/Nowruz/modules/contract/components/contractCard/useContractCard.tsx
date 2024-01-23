import variables from 'src/components/_exports.module.scss';
import { Offer } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';

export const useContractCard = (offer: Offer, type: 'users' | 'organizations') => {
  const StartIcon = () => {
    if (type === 'users') {
      switch (offer.status) {
        case 'APPROVED':
          return (
            <Icon name="check-circle" fontSize={12} color={variables.$color_success_600} className="text-Success-600" />
          );
        case 'PENDING':
          return <Icon name="clock" fontSize={12} color={variables.$color_grey_700} className="text-Warning-600" />;
        default:
          return <Icon name="click" fontSize={12} color={variables.$color_primary_600} className="text-Brand-600" />;
      }
    } else {
      switch (offer.status) {
        case 'APPROVED':
          return <Icon name="clock" fontSize={12} color={variables.$color_warning_600} className="text-Warning-600" />;
        case 'PENDING':
          return <Icon name="arrow-up" fontSize={12} color={variables.$color_warning_600} className="text-grey-700" />;
        default:
          return <Icon name="click" fontSize={12} color={variables.$color_primary_600} className="text-Brand-600" />;
      }
    }
  };

  const BadgeTheme = () => {
    const statusColorMap = {
      APPROVED: 'primary',
      PENDING: type === 'users' ? 'warning' : 'secondary',
      CANCELED: 'secondary',
      CLOSED: 'secondary',
      HIRED: 'secondary',
      KICK_OUT: 'secondary',
      WITHDRAWN: 'secondary',
    };

    return statusColorMap[offer.status];
  };

  const theme = BadgeTheme();
  const icon = StartIcon();
  return { theme, icon };
};

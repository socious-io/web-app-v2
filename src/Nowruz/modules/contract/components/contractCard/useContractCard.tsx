import variables from 'src/components/_exports.module.scss';
import { Offer } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';

export const useContractCard = (offer: Offer) => {
  const startIcon =
    offer.status === 'APPROVED' ? (
      <Icon name="check-circle" fontSize={12} color={variables.$color_success_600} className="text-Success-600" />
    ) : offer.status === 'PENDING' ? (
      <Icon name="clock" fontSize={12} color={variables.$color_warning_600} className="text-Warning-600" />
    ) : (
      <Icon name="click" fontSize={12} color={variables.$color_primary_600} className="text-Brand-600" />
    );

  const BadgeTheme = () => {
    switch (offer.status) {
      case 'APPROVED':
        return 'primary';
      case 'PENDING':
        return 'warning';
      case 'CANCELED':
      case 'CLOSED':
      case 'HIRED':
      case 'KICK_OUT':
      case 'WITHDRAWN':
        return 'secondary';
    }
  };

  const theme = BadgeTheme();
  return { theme, startIcon };
};

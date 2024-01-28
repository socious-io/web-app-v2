import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { CurrentIdentity, Mission, Offer } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { RootState } from 'src/store';

export const useContractCard = (offer: Offer, mission?: Mission) => {
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const type = identity?.type;

  const name = type === 'users' ? offer.recipient.meta.name : offer.offerer.meta.name;
  const profileImageUrl = type === 'users' ? offer.recipient.meta.avatar : offer.offerer.meta.image;
  const currencyIconName = offer.currency === 'JPY' ? 'currency-yen-circle' : 'currency-dollar-circle';

  const BadgeData = () => {
    switch (offer.status) {
      case 'PENDING':
        if (type === 'users')
          return {
            label: 'Offer received',
            theme: 'warning',
            icon: <Dot size="small" color={variables.color_warning_600} shadow={false} />,
          };
        return {
          label: 'Offer sent',
          theme: 'secondary',
          icon: <Icon fontSize={12} name="arrow-up" className="text-Gray-light-mode-600" />,
        };
      case 'APPROVED':
        if (type === 'users')
          return {
            label: 'Awaiting confirmation',
            theme: 'warning',
            icon: <Icon fontSize={12} name="clock" className="text-Warning-600" />,
          };
        return {
          label: 'Payment required',
          theme: 'warning',
          icon: <Icon fontSize={12} name="alert-circle" className="text-Warning-600" />,
        };
      case 'HIRED':
        if (mission?.status === 'ACTIVE')
          return {
            label: 'Ongoing',
            theme: 'success',
            icon: <Dot size="small" color={variables.color_success_700} shadow={false} />,
          };
        else if (mission?.status === 'COMPLETE')
          return {
            label: 'Awaiting confirmation',
            theme: 'warning',
            icon: <Icon fontSize={12} name="clock" className="text-Warning-600" />,
          };
        else if (mission?.status === 'CANCELED')
          return {
            label: 'Canceled',
            theme: 'secondary',
            icon: <></>,
          };
        else if (mission?.status === 'KICKED_OUT')
          return {
            label: 'Kicked out',
            theme: 'secondary',
            icon: <></>,
          };
        else return;
      case 'CLOSED':
        if (mission?.status === 'CONFIRMED')
          return {
            label: 'Completed',
            theme: 'success',
            icon: <Icon name="check-circle" fontSize={12} className="text-Success-600" />,
          };
        else return;
      case 'CANCELED':
        return {
          label: 'Canceled',
          theme: 'secondary',
          icon: <></>,
        };
      case 'WITHDRAWN':
        return {
          label: 'Withdrawn',
          theme: 'secondary',
          icon: <></>,
        };
    }
  };

  const badge = BadgeData();
  return { badge, type, name, profileImageUrl, currencyIconName };
};

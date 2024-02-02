import { useState } from 'react';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { CurrentIdentity, getOffer, Mission, Offer, userMissions } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { RootState } from 'src/store';

export const useContractCard = (offer: Offer, mission?: Mission) => {
  const [openOverlayModal, setOpenOverlayModal] = useState(false);
  const [offerVal, setOfferVal] = useState(offer);
  const [missionVal, setMissionVal] = useState(mission);
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const type = identity?.type;

  const name = type === 'users' ? offerVal.offerer.meta.name : offerVal.recipient.meta.name;
  const profileImageUrl = type === 'users' ? offerVal.offerer.meta.image : offerVal.recipient.meta.avatar;
  const currencyIconName = offerVal.currency === 'JPY' ? 'currency-yen-circle' : 'currency-dollar-circle';

  const BadgeData = () => {
    switch (offerVal.status) {
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
        if (missionVal?.status === 'ACTIVE')
          return {
            label: 'Ongoing',
            theme: 'success',
            icon: <Dot size="small" color={variables.color_success_700} shadow={false} />,
          };
        return;
      case 'CLOSED':
        if (missionVal?.status === 'CONFIRMED')
          return {
            label: 'Completed',
            theme: 'success',
            icon: <Icon name="check-circle" fontSize={12} className="text-Success-600" />,
          };
        else if (missionVal?.status === 'COMPLETE')
          return {
            label: 'Awaiting confirmation',
            theme: 'warning',
            icon: <Icon fontSize={12} name="clock" className="text-Warning-600" />,
          };
        else if (missionVal?.status === 'CANCELED')
          return {
            label: 'Canceled',
            theme: 'secondary',
            icon: <></>,
          };
        else if (missionVal?.status === 'KICKED_OUT')
          return {
            label: 'Kicked out',
            theme: 'secondary',
            icon: <></>,
          };
        else
          return {
            label: 'Closed',
            theme: 'secondary',
            icon: <></>,
          };
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

  const handleCloseModal = async () => {
    const offerRes = await getOffer(offer.id);
    const missionRes = await userMissions();
    setOfferVal(offerRes);
    setMissionVal(missionRes.items.find((item) => item.offer.id === offer.id));
    setOpenOverlayModal(false);
    // setOpenAcceptModal(false);
    // setOpenCompleteModal(false);
    // setOpenDefaultModal(false);
  };

  const badge = BadgeData();

  return {
    badge,
    type,
    name,
    profileImageUrl,
    currencyIconName,
    handleCloseModal,
    offerVal,
    missionVal,
    openOverlayModal,
    setOpenOverlayModal,
  };
};

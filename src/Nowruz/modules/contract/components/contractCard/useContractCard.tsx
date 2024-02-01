import { useState } from 'react';
import { useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { CurrentIdentity, getOffer, Mission, Offer, userMissions } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { RootState } from 'src/store';

export const useContractCard = (offer: Offer, mission?: Mission) => {
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [openCompleteModal, setOpenCompleteModal] = useState(false);
  const [openDefaultModal, setOpenDefaultModal] = useState(false);
  const [offerVal, setOfferVal] = useState(offer);
  const [missionVal, setMissionVal] = useState(mission);
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const type = identity?.type;

  const name = type === 'users' ? offerVal.offerer.meta.name : offerVal.recipient.meta.name;
  const profileImageUrl = type === 'users' ? offerVal.offerer.meta.image : offerVal.recipient.meta.avatar;

  // We might delete currency icon later (we accept only USD or JPY at the moment)
  const currencyIconName = (() => {
    switch (offerVal.currency) {
      case 'JPY':
        return 'currency-yen-circle';
      case 'USD':
        return 'currency-dollar-circle';
    }
  })();

  // Format the amount depending of the currency
  const formatCurrency = (() => {
    const options = { useGrouping: true };
  
    switch (offerVal.currency) {
      case 'JPY':
        return new Intl.NumberFormat('ja-JP', { ...options, maximumFractionDigits: 0 }) // Japanese Yen typically doesn't use decimal places
          .format(offerVal.assignment_total);
      case 'USD':
        return new Intl.NumberFormat('en-US', { ...options, maximumFractionDigits: 2 })
          .format(offerVal.assignment_total);
      default:
        return offerVal.assignment_total.toString(); // Ensure the default case returns a string for consistency
    }
  })();
  
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
  const handleOpenModal = () => {
    if (identity?.type === 'users' && offerVal.status === 'PENDING') {
      setOpenAcceptModal(true);
      return;
    }

    if (offerVal.status === 'HIRED' && missionVal?.status === 'ACTIVE' && identity?.type === 'users') {
      setOpenCompleteModal(true);
      return;
    }

    setOpenDefaultModal(true);
  };

  const handleCloseModal = async () => {
    const offerRes = await getOffer(offer.id);
    const missionRes = await userMissions();
    setOfferVal(offerRes);
    setMissionVal(missionRes.items.find((item) => item.offer.id === offer.id));
    setOpenAcceptModal(false);
    setOpenCompleteModal(false);
    setOpenDefaultModal(false);
  };

  const badge = BadgeData();

  return {
    badge,
    type,
    name,
    profileImageUrl,
    currencyIconName,
    formatCurrency,
    openAcceptModal,
    openCompleteModal,
    openDefaultModal,
    handleOpenModal,
    handleCloseModal,
    offerVal,
    missionVal,
  };
};

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Service } from 'src/core/adaptors';
import { connectionStatus, CurrentIdentity } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useServiceDetail = () => {
  const navigate = useNavigate();
  const { serviceDetail: service } = useLoaderData() as { serviceDetail: Service };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const identityType = currentIdentity?.type;
  const [openSlider, setOpenSlider] = useState(false);
  const isOwner = currentIdentity?.id === service?.identity?.id;
  const serviceDetail = {
    skills: service.skills,
    delivery: service.delivery,
    price: service.price,
    currency: service.currency,
    payment: service.payment,
  };
  const maxLengthDescription = isTouchDevice() ? 130 : 1150;
  const feePercentage = 2;
  const feeCalculation = parseFloat(service.price) * (feePercentage / 100);
  const orderPayment = { feePercentage, fee: feeCalculation, total: feeCalculation + parseFloat(service.price) };

  const onBack = () => service?.identity && navigate(`/profile/users/${service.identity?.usernameVal}/view#services`);

  const onContact = async () => {
    const participantId = service?.identity?.id;
    const username = service?.identity?.usernameVal;

    if (!participantId) return;

    if (identityType === 'organizations') {
      navigate(`/chats?participantId=${participantId}`);
      return;
    }

    const { connect } = await connectionStatus(participantId);
    const targetPath = connect ? `/chats?participantId=${participantId}` : `/profile/users/${username}/view`;
    navigate(targetPath);
  };

  const onServiceActions = (actionName: 'share' | 'contact' | 'edit') => {
    const actions = {
      edit: () => navigate(`/services/edit/${service?.id}`),
      contact: onContact,
      share: () => null, // TODO: Handle share later
    };
    actions[actionName]();
  };

  const onPurchase = () => setOpenSlider(true);

  const onCheckoutService = () => navigate('pay');

  return {
    data: {
      service,
      account: service?.identity,
      serviceDetail,
      isOwner,
      maxLengthDescription,
      openSlider,
      orderPayment,
    },
    operations: { onBack, onServiceActions, onPurchase, setOpenSlider, onCheckoutService },
  };
};

import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Service } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useServiceDetail = () => {
  const navigate = useNavigate();
  const { serviceDetail: service } = useLoaderData() as { serviceDetail: Service };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const isOwner = currentIdentity?.id === service?.identity?.id;
  const serviceDetail = {
    skills: service.skills,
    delivery: service.delivery,
    price: service.price,
    currency: service.currency,
    payment: service?.payment || 'FIAT',
  };
  const maxLengthDescription = isTouchDevice() ? 130 : 1150;

  const onBack = () => service?.identity && navigate(`/profile/users/${service.identity?.usernameVal}/view#services`);

  const onServiceActions = (actionName: 'share' | 'edit') => {
    if (actionName === 'edit') navigate(`/services/edit/${service?.id}`);
  };

  const onPurchase = () => console.log('purchase');

  return {
    data: {
      service,
      account: service?.identity,
      serviceDetail,
      isOwner,
      maxLengthDescription,
    },
    operations: { onBack, onServiceActions, onPurchase },
  };
};

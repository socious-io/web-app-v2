import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { ServiceReq } from 'src/core/adaptors';
import { CurrentIdentity } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { RootState } from 'src/store';

export const useServiceDetail = () => {
  const navigate = useNavigate();
  const { serviceDetail: service } = useLoaderData() as { serviceDetail: ServiceReq };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const isOwner = currentIdentity?.id === service?.account?.id;
  const serviceDetail = {
    skills: service.skills,
    delivery: service.delivery,
    price: service.price,
    currency: service.currency,
    payment: service.payment,
  };
  const maxLengthDescription = isTouchDevice() ? 130 : 1150;

  const onBack = () => service?.account && navigate(`/profile/users/${service.account?.username}/view#services`);

  const onServiceActions = (actionName: 'share' | 'edit') => {
    if (actionName === 'edit') navigate(`/services/edit/${service?.id}`);
  };

  const onPurchase = () => console.log('purchase');

  return {
    data: {
      service,
      account: service?.account,
      serviceDetail,
      isOwner,
      maxLengthDescription,
    },
    operations: { onBack, onServiceActions, onPurchase },
  };
};

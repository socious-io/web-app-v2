import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CurrentIdentity, Mission } from 'src/core/api';
import { toRelativeTime } from 'src/core/relative-time';
import { RootState } from 'src/store';

export const useTransactionDetailes = () => {
  const { mission } = useLoaderData() as { mission: Mission };

  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const currentIdType = currentIdentity?.type;

  const handleBack = () => {
    navigate('/nowruz/wallet');
  };
  const name = currentIdType === 'users' ? mission.organization.name : mission.assignee.meta.name;
  const avatar = currentIdType === 'users' ? mission.organization.image : mission.assignee.meta.avatar;
  const email = currentIdType === 'users' ? mission.organization.email : mission.assignee.meta.email;
  const avatarType = currentIdType === 'users' ? 'organizations' : 'users';
  const date = toRelativeTime(mission.payment.created_at.toString());
  const amount = mission.payment.amount;
  const transactionId = mission.escrow.id;

  return { handleBack, name, avatar, avatarType, date, amount, transactionId, email };
};

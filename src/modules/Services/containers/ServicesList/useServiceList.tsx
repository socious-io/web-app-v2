import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteServiceAdaptor, getServicesAdaptor, ServicesRes } from 'src/core/adaptors';
import { CurrentIdentity, UserProfile } from 'src/core/api';
import { RootState } from 'src/store';

export const useServiceList = () => {
  const navigate = useNavigate();
  const { services, user } = useLoaderData() as { services: ServicesRes; user: UserProfile };
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const [openDeleteModal, setOpenDeleteModal] = useState('');
  const [page, setPage] = useState(1);
  const [currentServices, setCurrentServices] = useState(services);
  const currentList = currentServices?.items || [];
  const totalPage = Math.ceil((currentServices?.total || 1) / (currentServices?.limit || 5));
  const limit = 5;
  const myProfile = currentIdentity?.id === user?.id;

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    const { data } = await getServicesAdaptor(newPage, limit, { kind: 'SERVICE' });
    data && setCurrentServices(data);
  };

  const onServiceClick = (serviceId: string) => navigate(`/services/${serviceId}`);

  const onServiceActions = (actionName: 'duplicate' | 'delete' | 'edit', serviceId: string) => {
    if (actionName === 'delete') setOpenDeleteModal(serviceId);
    else navigate(`/services/${actionName}/${serviceId}`);
  };

  const onCreateService = () => navigate('/services/create');

  const onDeleteService = async () => {
    const serviceId = openDeleteModal || '';
    if (serviceId) {
      const { error } = await deleteServiceAdaptor(serviceId);
      if (error) return;
      const filteredList = currentList.filter(list => list.id !== serviceId);
      onChangePage(filteredList.length === 0 && page > 1 ? page - 1 : page);
      setOpenDeleteModal('');
    }
  };

  return {
    data: { myProfile, services: currentList, page, totalPage, openDeleteModal },
    operations: {
      onChangePage,
      onServiceClick,
      onServiceActions,
      onCreateService,
      setOpenDeleteModal,
      onDeleteService,
    },
  };
};

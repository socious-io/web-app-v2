import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { deleteServiceAdaptor, getServicesAdaptor, ServicesRes } from 'src/core/adaptors';

export const useServiceList = () => {
  const navigate = useNavigate();
  const { services } = useLoaderData() as { services: ServicesRes };
  const [openDeleteModal, setOpenDeleteModal] = useState('');
  const [page, setPage] = useState(1);
  const [currentServices, setCurrentServices] = useState(services);
  const currentList = currentServices?.items || [];
  const totalPage = Math.ceil((currentServices?.total_count || 1) / (currentServices?.limit || 5));
  const limit = 5;

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
    data: { services: currentList, page, totalPage, openDeleteModal },
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

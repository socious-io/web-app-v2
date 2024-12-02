import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { getServicesAdaptor, ServicesRes } from 'src/core/adaptors';

export const useServiceList = () => {
  const navigate = useNavigate();
  const { services } = useLoaderData() as { services: ServicesRes };
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

  const onServiceActions = (actionName: string, serviceId: string) => console.log(actionName, serviceId);

  return {
    data: { services: currentList, page, totalPage },
    operations: { onChangePage, onServiceClick, onServiceActions },
  };
};

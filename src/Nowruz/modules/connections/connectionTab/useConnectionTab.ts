import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { Connection, CurrentIdentity, connections } from 'src/core/api';
import { RootState } from 'src/store';

import { useIsMount } from '../../general/components/useIsMount';

export const useConnectionTab = () => {
  const loaderData = useLoaderData();
  console.log('test log loaderData.connections?.items ', loaderData.connections?.items);

  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) =>
    state.identity.entities.find((identity) => identity.current),
  );
  const [connectionList, setConnectionList] = useState<Connection[]>(loaderData.connections?.items || []);
  const [page, setPage] = useState(1);
  const isMount = useIsMount();

  const fetchMore = async () => {
    if (!isMount) {
      const res = await connections({ page, limit: 10, 'filter.status': 'CONNECTED' });
      setConnectionList(res.items);
    }
  };

  useEffect(() => {
    fetchMore();
  }, [page]);

  return { setPage, connectionList, currentIdentity };
};

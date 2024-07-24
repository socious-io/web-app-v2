import { useLoaderData } from 'react-router-dom';

export const useValueContainer = () => {
  const loaderData = useLoaderData();
  console.log('test log loaderData', loaderData);
  return { loaderData };
};

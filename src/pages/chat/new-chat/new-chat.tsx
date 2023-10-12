import { Navigate, useLoaderData } from 'react-router-dom';

export const NewChat = (): JSX.Element => {
  const chatId = useLoaderData();
  return <Navigate replace to={`/contacts/${chatId}`} />;
};

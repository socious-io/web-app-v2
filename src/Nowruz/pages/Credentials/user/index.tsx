import React from 'react';
import { useLoaderData } from 'react-router-dom';

export const UserCredentials = () => {
  const res = useLoaderData();
  console.log('test log res', res);
  return <div>UserCredentials</div>;
};

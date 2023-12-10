import React from 'react';
import { useNavigate } from 'react-router-dom';

export const useUserCard = () => {
  const navigate = useNavigate();
  const viewProfile = (type: string, id: string) => {
    console.log(type, id);
    if (type === 'users') navigate(`/profile/users/${id}/view`);
    else navigate(`/profile/organizations/${id}/view`);
  };
  return { viewProfile };
};

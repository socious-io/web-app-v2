import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LinkItem } from '../linkItem/LinkItem';
import { LinksContainerProps } from '../linksContainer/linksContainer.types';

export const Footer: React.FC<LinksContainerProps> = ({ open }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  items-center w-full h-fit px-4 pb-6 gap-2 mb-0 mt-auto">
      <LinkItem
        label="Help"
        navigateFunc={() => {
          navigate('/');
        }}
        iconName="help-circle"
        menuOpen={open}
      />
      <LinkItem
        label="Settings"
        navigateFunc={() => {
          navigate('/');
        }}
        iconName="settings-01"
        menuOpen={open}
      />
      <LinkItem
        label="Logout"
        navigateFunc={() => {
          navigate('/');
        }}
        iconName="log-out-01"
        menuOpen={open}
      />
    </div>
  );
};

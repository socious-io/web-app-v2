import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LinkItem } from '../linkItem/LinkItem';
import { LinksContainerProps } from '../linksContainer/linksContainer.types';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { CurrentIdentity } from 'src/core/api';

export const Footer: React.FC<LinksContainerProps> = ({ open }) => {
  const navigate = useNavigate();
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const userIsLoggedIn = !!currentIdentity;

  return (
    <div className="flex flex-col  items-center w-full h-fit px-4 pb-6 gap-2 mb-0 mt-auto">
      {userIsLoggedIn && (
        <>
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
        </>
      )}
      {!userIsLoggedIn && (
        <LinkItem
          label="Login"
          navigateFunc={() => {
            navigate('/sign-in');
          }}
          iconName="log-in-01"
          menuOpen={open}
        />
      )}
    </div>
  );
};

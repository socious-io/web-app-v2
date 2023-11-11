import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'src/Nowruz/general/Icon';
import Badge from 'src/Nowruz/modules/general/components/Badge';

import { LinksContainerProps } from './linksContainer.types';
import { LinkItem } from '../linkItem/LinkItem';

export const LinksContainer: React.FC<LinksContainerProps> = ({ open }) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-start items-center w-full h-fit pt-8 gap-6">
      <div className="w-full h-fit py-0 pl-6 pr-5">
        <img src={open ? '/icons/nowruz/logo-white.svg' : '/icons/nowruz/logoMark-white.svg'} alt="" />
      </div>
      <div className="w-full flex flex-col gap-2 px-4 ">
        <LinkItem
          label="Dashboard"
          navigateFunc={() => {
            navigate('/');
          }}
          iconName="home-line"
          menuOpen={open}
        />
        <LinkItem
          label="Jobs"
          navigateFunc={() => navigate('/jobs')}
          iconName="briefcase-01"
          children={[
            {
              label: 'Find work',
              navigateFunc: () => {
                navigate('/');
              },
            },
            {
              label: 'Saved jobs',
              navigateFunc: () => {
                navigate('/');
              },
            },
          ]}
          menuOpen={open}
          subMenuOpen={subMenuOpen}
          badgeIcon={
            subMenuOpen ? (
              <Icon
                name="chevron-up"
                className="text-Brand-300"
                fontSize={20}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
              />
            ) : (
              <Icon
                name="chevron-down"
                className="text-Brand-300"
                fontSize={20}
                onClick={() => setSubMenuOpen(!subMenuOpen)}
              />
            )
          }
        />
        <LinkItem
          label="Contracts"
          navigateFunc={() => {
            navigate('/');
          }}
          iconName="file-02"
          menuOpen={open}
        />
        <LinkItem
          label="Communities"
          navigateFunc={() => {
            navigate('/');
          }}
          iconName="users-01"
          menuOpen={open}
        />
        <LinkItem
          label="Messages"
          navigateFunc={() => navigate('/chats')}
          iconName="message-square-01"
          menuOpen={open}
          badgeIcon={<Badge content="10" />}
        />
        <LinkItem
          label="Wallet"
          navigateFunc={() => {
            navigate('/');
          }}
          iconName="wallet-04"
          menuOpen={open}
        />
      </div>
    </div>
  );
};

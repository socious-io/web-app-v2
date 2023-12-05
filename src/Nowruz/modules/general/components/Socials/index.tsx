//This is draft will be implemented later
import React from 'react';

import { SocialsProps } from './Socials.types';

const socials = [
  { name: 'twitter', image: '/icons/twitter.svg' },
  { name: 'linkedin', image: '/icons/linkedin.svg' },
];
export const Socials: React.FC<SocialsProps> = ({ items }) => {
  const linkIcons = items.map((item) => ({
    url: item.url,
    icon: socials[socials.findIndex((social) => social.name === item.name)].image,
  }));
  return (
    <div className="flex justify-center">
      {linkIcons.map((item) => (
        <a href={item.url} className="mr-4">
          <img src={item.icon} width={'20px'} height={'20px'} />
        </a>
      ))}
    </div>
  );
};

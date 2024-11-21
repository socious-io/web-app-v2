//This is draft will be implemented later
import React from 'react';

import { SocialsProps } from './Socials.types';
import { Icon } from '../Icon';

//FIXME: fill color later according to design
const socials = [
  { name: 'twitter', color: '' },
  { name: 'linkedin', color: '' },
];
export const Socials: React.FC<SocialsProps> = ({ items }) => {
  const linkIcons = items.map(item => ({
    url: item.url,
    icon: item.name,
    color: socials.find(social => social.name === item.name)?.color || '',
  }));
  return (
    <div className="flex justify-center">
      {linkIcons.map(item => (
        <a key={item.url} href={item.url} className="mr-4">
          <Icon name={item.icon} fontSize={20} color={item.color} />
        </a>
      ))}
    </div>
  );
};

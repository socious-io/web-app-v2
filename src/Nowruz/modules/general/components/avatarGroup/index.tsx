import React from 'react';
import { UserMeta } from 'src/core/api';

import { AvatarGroupProps } from './index.types';
import { Avatar } from '../avatar/avatar';

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  identities,
  length = identities.length,
  size = '32px',
  customStyle = '',
}) => {
  return (
    <div className="flex items-center">
      {identities.slice(0, length).map(identity => (
        <Avatar
          key={identity.id}
          size={size}
          type={identity.type || 'users'}
          img={(identity.meta as UserMeta)?.avatar}
          customStyle={`ml-[-8px] ${customStyle}`}
        />
      ))}
    </div>
  );
};

export default AvatarGroup;

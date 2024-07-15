import React from 'react';
import { getIdentityMeta } from 'src/core/utils';

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
      {identities.slice(0, length).map(identity => {
        const { profileImage } = getIdentityMeta(identity);
        return (
          <Avatar
            key={identity.id}
            size={size}
            type={identity.type || 'users'}
            img={profileImage || ''}
            customStyle={`ml-[-8px] ${customStyle}`}
          />
        );
      })}
    </div>
  );
};

export default AvatarGroup;

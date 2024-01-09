import React from 'react';
import { Organization, User } from 'src/core/api';

interface ProfileCardProps {
  identity: User | Organization;
}
const ProfileCard: React.FC<ProfileCardProps> = () => {
  return <div>ProfileCard</div>;
};

export default ProfileCard;

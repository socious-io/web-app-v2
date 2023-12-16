import React from 'react';
import { AdditionalRes, AdditionalTypes } from 'src/core/api/additionals/additionals.types';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import { Error } from '../../containers/editInfo/editInfo.types';

interface LinkItemProps {
  link: AdditionalRes;
  editLink: (id: string, title: AdditionalTypes, url: string) => void;
  deleteLink: (id: string) => void;
  errors: Error[];
  setErrors: (newVal: Error[]) => void;
}
export const LinkItem: React.FC<LinkItemProps> = ({ link, editLink, deleteLink, errors, setErrors }) => {
  return (
    <div className="w-full flex gap-4">
      <Input id={`link-${link.id}-title`} required />
    </div>
  );
};

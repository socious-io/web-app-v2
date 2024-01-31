import { Typography } from '@mui/material';
import { AdditionalRes } from 'src/core/api/additionals/additionals.types';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import { UseUpdatelinks } from './useUpdateLinks';
import { Error } from '../../containers/editInfo/editInfo.types';

interface UpdateLinksProps {
  links: AdditionalRes[] | null;
  setLinks: (newval: AdditionalRes[]) => void;
  errors: Error[];
  setErrors: (newVal: Error[]) => void;
}

export const UpdateLinks: React.FC<UpdateLinksProps> = ({ links, setLinks }) => {
  const { addNewLink, deleteLink, editLink } = UseUpdatelinks(links, setLinks);
  return (
    <div className="w-full flex flex-col gap-4 py-5 items-start">
      <Typography variant="h4" className="text-Gray-light-mode-700">
        Links
      </Typography>
      {/* {links?.map((l) => <LinkItem key={l.id} language={l} editLink={editLink} deleteLink={deleteLink} />)} */}
      <Button
        variant="text"
        color="primary"
        onClick={addNewLink}
        customStyle="flex items-center justify-center gap-2 text-Brand-700"
      >
        <Icon fontSize={20} name="plus" className="text-Brand-700" />
        Add a link
      </Button>
    </div>
  );
};

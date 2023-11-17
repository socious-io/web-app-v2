import Divider from '@mui/material/Divider';
import variables from 'src/components/_exports.module.scss';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './image-bio.module.scss';
import { useOrganizationLogo } from './useOrganizationLogo';

export const OrganizationLogo = () => {
  const { updateBio, onUploadImage, image, isValidForm, bio, goNextPage, bioCounter } = useOrganizationLogo();

  return (
    <div className="flex flex-col items-stretch lg:pt-7 sm:pt-5 px-4">
      <div className={css.header}>
        <div className={css.title}>
          <h1>Tell us more about your organization</h1>
        </div>
        <div className={css.description}>
          <h2>Add your logo and short description</h2>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Avatar size="96px" type="organizations" img={image.imageUrl} />
      </div>
      <div className="mt-5">
        <Button
          startIcon={<Icon name="upload-cloud-02" fontSize={20} color={variables.color_primary_700} />}
          color="secondary"
          variant="outlined"
          block
          onClick={onUploadImage}
          customStyle={css.uploadButton}
        >
          Upload
        </Button>
      </div>
      <div className="my-5">
        <Divider sx={{ bgcolor: variables.color_primary_300 }} />
      </div>
      <Input
        value={bio}
        label="Headline"
        customHeight="128px"
        variant="outlined"
        placeholder="eg."
        multiline
        onChange={(e) => updateBio(e.target.value)}
      />
      <div className={css.counter}>{bioCounter}/160</div>
      <div className="mt-6 mb-2">
        <Button disabled={isValidForm} color="primary" block onClick={goNextPage}>
          Continue
        </Button>
      </div>
    </div>
  );
};

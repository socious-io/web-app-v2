import Divider from '@mui/material/Divider';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/FeaturedIcon';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './image-bio.module.scss';
import { useOrganizationLogo } from './useOrganizationLogo';

export const OrganizationLogo = () => {
  const { updateBio, onUploadImage, image, isValidForm, bio, goNextPage, bioCounter, imageUrl } = useOrganizationLogo();
  console.log(imageUrl);
  return (
    <div className="flex flex-col items-stretch lg:pt-7 sm:pt-5 px-4">
      <div className={css.header}>
        <div>
          <h1 className={css.title}>Tell us more about your organization</h1>
        </div>
        <div>
          <h2 className={css.description}>Add your logo and short description</h2>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Avatar size="96px" type="organizations" img={imageUrl} iconSize={47} />
      </div>
      <div className="mt-5 md:hidden">
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
      <div className={`${css.uploadContainer} hidden md:flex`} onClick={onUploadImage}>
        <FeaturedIcon iconName="upload-cloud-02" className="mb-2" />
        <span className="font-bold">Click to upload</span>
        <span className={css.uploadDetailText}>SVG, PNG, JPG or GIF (max. 2MB)</span>
      </div>
      <div className="my-5">
        <Divider sx={{ bgcolor: variables.color_primary_300 }} />
      </div>
      <Input
        id="bio"
        value={bio}
        label="Headline"
        customHeight="128px"
        variant="outlined"
        placeholder="eg."
        multiline
        onChange={(e) => updateBio(e.target.value)}
      />
      <div className={css.counter}>{bioCounter}/160</div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ${css.footer}`}>
        <Button color="primary" block onClick={goNextPage}>
          Next: Contact information
        </Button>
      </div>
    </div>
  );
};

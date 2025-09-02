import Divider from '@mui/material/Divider';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/FeaturedIcon';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './image-bio.module.scss';
import { useOrganizationLogo } from './useOrganizationLogo';

export const OrganizationLogo = () => {
  const { updateBio, onUploadImage, bio, goNextPage, bioCounter, imageUrl, uploadError, translate } =
    useOrganizationLogo();
  return (
    <div className="flex flex-col items-stretch lg:pt-7 sm:pt-5 px-4">
      <div className={css.header}>
        <div>
          <h1 className={css.title}>{translate('onboarding-org-logo-title')}</h1>
        </div>
        <div>
          <h2 className={css.description}>{translate('onboarding-org-logo-subtitle')}</h2>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Avatar size="96px" type="organizations" img={imageUrl || ''} iconSize={47} />
      </div>
      <div className="mt-5 md:hidden">
        <Button
          startIcon={<Icon name="upload-cloud-02" fontSize={20} color={variables.color_grey_700} />}
          color="secondary"
          variant="outlined"
          block
          onClick={onUploadImage}
          customStyle={css.uploadButton}
        >
          {translate('onboarding-logo-upload')}
        </Button>
      </div>
      <div className={`${css.uploadContainer} hidden md:flex`} onClick={onUploadImage}>
        <FeaturedIcon iconName="upload-cloud-02" className="mb-2" iconColor={variables.color_grey_600} />
        <span className={css.uploadText}>{translate('onboarding-logo-upload-click')}</span>
        <span className={css.uploadDetailText}>{translate('onboarding-logo-file-types')}</span>
      </div>
      {uploadError && (
        <div className="mt-2">
          <span className={css.uploadError}>{uploadError}</span>
        </div>
      )}
      <div className="my-5">
        <Divider sx={{ bgcolor: variables.color_grey_200 }} />
      </div>
      <Input
        id="bio"
        value={bio}
        label={translate('onboarding-org-bio')}
        customHeight="128px"
        placeholder={translate('onboarding-org-bio-placeholder')}
        multiline
        onChange={e => updateBio(e.target.value)}
      />
      <div className={css.counter}>{bioCounter}/160</div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-6 ${css.footer}`}>
        <Button data-testid="next-button" color="primary" block onClick={goNextPage}>
          {translate('onboarding-next-contact')}
        </Button>
      </div>
    </div>
  );
};

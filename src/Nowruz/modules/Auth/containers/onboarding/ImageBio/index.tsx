import Divider from '@mui/material/Divider';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';

import css from './image-bio.module.scss';
import { useImageBio } from './useImageBio';

export const ImageBio = () => {
  const { updateBio, onUploadImage, image, isValidForm, bio, updateProfile } = useImageBio();

  return (
    <div className="flex flex-col items-stretch lg:pt-7 sm:pt-5 px-4">
      <div className={css.header}>
        <div className={css.title}>
          <h1>What are you passionated about?</h1>
        </div>
        <div className={css.description}>
          <h2>Select up to 5 social causes</h2>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <Avatar size="96px" type="users" img={image.imageUrl} />
      </div>
      <div className="mt-5">
        <Button color="secondary" variant="outlined" block onClick={onUploadImage}>
          Upload
        </Button>
      </div>
      <div className="my-5">
        <Divider />
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
      <div className="mt-6 mb-2">
        <Button disabled={!isValidForm} color="primary" block onClick={updateProfile}>
          Continue
        </Button>
      </div>
    </div>
  );
};

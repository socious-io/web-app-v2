import { Camera } from '@capacitor/camera';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadMedia } from 'src/core/api';
import { updateProfile as updateProfileApi } from 'src/core/api';
import { removeValuesFromObject } from 'src/core/utils';
import { useUser } from 'src/Nowruz/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { uploadImage } from 'src/pages/profile-user-edit/profile-user-edit.services';

export const useImageBio = () => {
  const navigate = useNavigate();
  const { state, updateUser } = useUser();
  const [image, setImage] = useState({ imageUrl: state.avatar?.url, id: '' });

  const onUploadImage = async () => {
    const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
    const resp = await uploadImage(webPath);
    updateUser({ ...state, avatar: resp });
    setImage({ imageUrl: resp.url, id: resp.id });
  };

  const removeImage = async () => {
    setImage({ imageUrl: '', id: '' });
    updateUser({ ...state, avatar: null });
  };

  const updateProfile = () => {
    const avatarImage = state.avatar ? { avatar: image.id } : {};
    updateProfileApi(
      removeValuesFromObject(
        {
          ...state,
          ...avatarImage,
        },
        ['', null],
      ),
    ).then(() => {
      navigate('/sign-up/user/allow-notification');
    });
  };

  const updateBio = (bio: string) => {
    if (bio.length <= 160) updateUser({ ...state, bio });
    console.log(state);
  };

  async function uploadImage(url: string) {
    const blob = await fetch(url).then((resp) => resp.blob());
    return uploadMedia(blob as File);
  }

  return { onUploadImage, updateBio };
};

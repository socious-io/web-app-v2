import { Camera } from '@capacitor/camera';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CurrentIdentity,
  profile,
  uploadMedia,
  updateProfile as updateProfileApi,
  UserMeta,
  UpdateProfileReq,
} from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { removeValuesFromObject } from 'src/core/utils';
import { useUser } from 'src/modules/Auth/contexts/onboarding/sign-up-user-onboarding.context';
import { RootState } from 'src/store';

export const useImageBio = () => {
  const navigate = useNavigate();
  const filter = localStorage.getItem('filter');
  const { events } = filter ? (JSON.parse(filter) as { events: string[] }) : { events: [] };
  const [uploadError, setUploadError] = useState('');
  const { state, updateUser } = useUser();
  const isMobile = isTouchDevice();
  const [image, setImage] = useState({ imageUrl: state.avatar?.url, id: '' });
  const currentIdentity = useSelector<RootState, CurrentIdentity>(state => {
    const current = state.identity.entities.find(identity => identity.current);
    return current as CurrentIdentity;
  });
  const onUploadImage = async () => {
    const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
    const resp = await uploadImage(webPath);
    if (resp) {
      updateUser({ ...state, avatar: resp });
      setImage({ imageUrl: resp.url, id: resp.id });
    }
  };

  const removeImage = async () => {
    setImage({ imageUrl: '', id: '' });
    updateUser({ ...state, avatar: null });
  };

  const updateProfile = async () => {
    const avatarImage = state.avatar ? image.id : '';
    let updatedObj = { ...state, avatar: avatarImage, cityLabel: '', orgType: '' };

    updatedObj = removeValuesFromObject(updatedObj, ['', null]);

    /* 
      Note: this is just make sure fix miss use state for updating profile and this going to make issue when
      registered for ORG want to complete onboarding for signed up user
    */

    if (!updatedObj.username) {
      const p = await profile();
      updatedObj.username = p.username;
      updatedObj.first_name = p.first_name || '';
      updatedObj.last_name = p.last_name || '';
    }

    await updateProfileApi(updatedObj);
    if (isMobile) {
      navigate(`/sign-up/user/notification`, {
        state: {
          username: (currentIdentity.meta as UserMeta).username,
        },
      });
    } else {
      if (events.length) {
        navigate('/search?q=&type=users&page=1');
      } else {
        navigate('/dashboard/user');
      }
    }
  };

  const updateBio = (bio: string) => {
    if (bio.length <= 160) updateUser({ ...state, bio });
  };

  async function uploadImage(url: string) {
    const blob = await fetch(url).then(resp => resp.blob());
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
    if (blob.size > MAX_IMAGE_SIZE) {
      setUploadError(`Image should be less than 5MB`);
    } else {
      setUploadError(``);

      const formData = new FormData();
      formData.append('file', blob);
      return uploadMedia(blob as File);
    }
  }

  const isValidForm = state.bio === '' || state.bio === null;
  const bio = state.bio;
  const bioCounter = state.bio ? state.bio.length : 0;
  return { onUploadImage, updateBio, image, isValidForm, bio, updateProfile, bioCounter, uploadError };
};

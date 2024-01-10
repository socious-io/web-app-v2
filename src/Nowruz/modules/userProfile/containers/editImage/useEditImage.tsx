import { Camera } from '@capacitor/camera';
import { useState } from 'react';
import { Area } from 'react-easy-crop/types';
import { useDispatch, useSelector } from 'react-redux';
import { Organization, PostMediaUploadRes, User, identities, uploadMedia } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { updateUserProfile, updateOrgProfile } from 'src/store/thunks/profile.thunks';

export const useEditImage = (closeModal: () => void, type: 'avatar' | 'header') => {
  const identity = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  });
  const identityType = useSelector<RootState, 'users' | 'organizations'>((state) => {
    return state.profile.type;
  });
  const [imageURL, setImageURL] = useState(
    type === 'avatar'
      ? identityType === 'users'
        ? (identity as User).avatar?.url
        : (identity as Organization).image?.url
      : identity?.cover_image?.url,
  );

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const [uploadError, setUploadError] = useState('');

  const dispatch = useDispatch();
  async function updateIdentityList() {
    return identities().then((resp) => dispatch(setIdentityList(resp)));
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  function createImage(): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.src = imageURL || '';
    });
  }
  const getCroppedImg = async () => {
    const image = await createImage();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
    canvas.width = safeArea;
    canvas.height = safeArea;
    if (!ctx) return null;

    ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    canvas.width = croppedAreaPixels?.width || 0;
    canvas.height = croppedAreaPixels?.height || 0;

    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - (croppedAreaPixels?.x || 0)),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - (croppedAreaPixels?.y || 0)),
    );

    return canvas.toDataURL('image/jpeg');
  };
  function updateIdentityImage(image: PostMediaUploadRes | undefined) {
    const updatedUser = { ...identity };
    const imageProperty = type === 'avatar' ? (identityType === 'users' ? 'avatar' : 'image') : 'cover_image';
    updatedUser[imageProperty] = image;
    const dispatchAction =
      identityType === 'users'
        ? store.dispatch(updateUserProfile(updatedUser as User))
        : store.dispatch(updateOrgProfile(updatedUser as Organization));
    dispatchAction.then(async () => {
      await updateIdentityList();
      closeModal();
    });
  }

  const saveImage = async () => {
    const croppedImage = await getCroppedImg();
    if (croppedImage) {
      const blob = await fetch(croppedImage).then((resp) => resp.blob());
      const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

      if (blob.size > MAX_IMAGE_SIZE) {
        setUploadError(`Image should be less than 5MB`);
      } else {
        setUploadError(``);
        const formData = new FormData();
        formData.append('file', blob);
        const newImg = await uploadMedia(blob as File);
        updateIdentityImage(newImg);
      }
    }
  };

  const handleChangePhoto = async () => {
    const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
    setImageURL(webPath);
  };

  const handleRemovePhoto = async () => {
    setImageURL('');
    updateIdentityImage(undefined);
  };

  const cropperSize =
    type === 'avatar'
      ? {
          width: 500,
          height: 500,
        }
      : isTouchDevice()
        ? {
            width: 550,
            height: 165,
          }
        : {
            width: 640,
            height: 192,
          };

  return {
    crop,
    setCrop,
    zoom,
    setZoom,
    onCropComplete,
    imageURL,
    saveImage,
    handleChangePhoto,
    uploadError,
    handleRemovePhoto,
    cropperSize,
  };
};

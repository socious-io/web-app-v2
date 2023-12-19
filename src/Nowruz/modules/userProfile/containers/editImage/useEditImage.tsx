import { Camera } from '@capacitor/camera';
import { useState } from 'react';
import { Area } from 'react-easy-crop/types';
import { useDispatch, useSelector } from 'react-redux';
import { User, identities, uploadMedia } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { updateUserProfile } from 'src/store/thunks/profile.thunks';

export const useEditImage = (closeModal: () => void, type: 'avatar' | 'header') => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const [imageURL, setImageURL] = useState(type === 'avatar' ? user?.avatar?.url : user?.cover_image?.url);

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

        let updatedUser = { ...user };
        if (type === 'avatar') {
          updatedUser = {
            ...user,
            avatar: newImg,
          };
        } else if (type === 'header') {
          updatedUser = {
            ...user,
            cover_image: newImg,
          };
        }

        store.dispatch(updateUserProfile(updatedUser as User)).then(async () => {
          await updateIdentityList();
          closeModal();
        });
      }
    }
  };

  const handleChangePhoto = async () => {
    const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
    setImageURL(webPath);
  };

  const handleRemovePhoto = async () => {
    setImageURL('');

    let updatedUser = { ...user };
    if (type === 'avatar')
      updatedUser = {
        ...user,
        avatar: undefined,
      };
    else if (type === 'header')
      updatedUser = {
        ...user,
        cover_image: undefined,
      };

    store.dispatch(updateUserProfile(updatedUser as User)).then(async () => {
      await updateIdentityList();
      closeModal();
    });
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

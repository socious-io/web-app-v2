import { useMemo, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { useForm } from 'src/core/form';
import { cityDispatcher, showActionSheet, uploadImage } from './profile-user-edit.services';
import { ProfileReq } from 'src/pages/profile-organization/profile-organization.types';
import { Camera } from '@capacitor/camera';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { endpoint } from 'src/core/endpoints';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { generateFormModel } from './profile-user-edit.form';

export const useProfileUserEditShared = () => {
  const user = useMatch().data.user as ProfileReq;
  const formModel = useMemo(() => generateFormModel(user), []);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const form = useForm(formModel);
  const updateCityList = cityDispatcher(setCities);
  const [coverImage, setCoverImage] = useState(user?.cover_image?.url);
  const [avatarImage, setAvatarImage] = useState(user?.avatar?.url);
  const navigate = useNavigate();

  async function onCoverEdit() {
    const actionResp = await showActionSheet();
    switch (actionResp) {
      case 'upload':
        const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
        const resp = await uploadImage(webPath);
        form.controls.cover_image.setValue(resp.id);
        setCoverImage(resp.url);
        break;
      case 'remove':
        break;
    }
  }

  async function onAvatarEdit() {
    const actionResp = await showActionSheet();
    switch (actionResp) {
      case 'upload':
        const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
        const resp = await uploadImage(webPath);
        form.controls.avatar.setValue(resp.id);
        setAvatarImage(resp.url);
        break;
      case 'remove':
        break;
    }
  }

  function onCountryUpdate(option: DropdownItem) {
    updateCityList(option.value as string);
  }

  function onSave() {
    const payload = getFormValues(form);
    endpoint.post.user['update/profile'](payload).then(() => {
      navigate({ to: '/jobs' });
    });
  }

  return {
    onCoverEdit,
    onAvatarEdit,
    onSave,
    onCountryUpdate,
    coverImage,
    avatarImage,
    cities,
    updateCityList,
  };
};

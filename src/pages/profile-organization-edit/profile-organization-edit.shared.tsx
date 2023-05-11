import { useMatch, useNavigate } from '@tanstack/react-location';
import { useMemo, useState } from 'react';
import { useForm } from 'src/core/form';
import { cityDispatcher, showActionSheet, uploadImage } from './profile-organization-edit.services';
import { generateFormModel } from './profile-organization-edit.form';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { ProfileReq } from '../profile-user/profile-user.types';
import { Camera } from '@capacitor/camera';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { endpoint } from 'src/core/endpoints';

export const useProfileOrganizationEditShared = () => {
  const organization = useMatch().data.user as ProfileReq;
  const formModel = useMemo(() => generateFormModel(organization), []);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const form = useForm(formModel);
  const updateCityList = cityDispatcher(setCities);
  const [coverImage, setCoverImage] = useState(organization?.cover_image?.url);
  const [avatarImage, setAvatarImage] = useState(organization?.image?.url);
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

  function onSave() {
    const payload = getFormValues(form);
    console.log('payload: ', payload);
    endpoint.post.organizations['orgs/update/{org_id}'](organization.id, payload).then(() => {
      navigate({ to: '/jobs' });
    });
  }

  return {
    onSave,
    onAvatarEdit,
    onCoverEdit,
    avatarImage,
    coverImage,
    updateCityList,
    form,
    cities,
    organization,
  };
};

import { Camera } from '@capacitor/camera';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { identities } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';
import { PostUpdateProfileResp } from 'src/core/endpoints/index.types';
import { useForm } from 'src/core/form';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { removedEmptyProps } from 'src/core/utils';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { generateFormModel } from './profile-organization-edit.form';
import { cityDispatcher, showActionSheet, uploadImage } from './profile-organization-edit.services';
import { ProfileReq } from '../profile-user/profile-user.types';
import { useLoaderData, useNavigate } from 'react-router-dom';

export const useProfileOrganizationEditShared = () => {
  const organization = useLoaderData().data.user as ProfileReq;
  const formModel = useMemo(() => generateFormModel(organization), []);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const form = useForm(formModel);
  const updateCityList = cityDispatcher(setCities);
  const [coverImage, setCoverImage] = useState(organization?.cover_image?.url);
  const [avatarImage, setAvatarImage] = useState(organization?.image?.url);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function runAvatarEditActions(type: 'upload' | 'remove' | undefined) {
    switch (type) {
      case 'upload':
        const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
        const resp = await uploadImage(webPath);
        form.controls.image.setValue(resp.id);
        setAvatarImage(resp.url);
        break;
      case 'remove':
        form.controls.image.setValue(undefined);
        setAvatarImage(undefined);
        break;
    }
  }

  const onAvatarEdit = {
    mobile: async () => {
      const actionResp = await showActionSheet();
      runAvatarEditActions(actionResp);
    },
    desktop: (type: 'upload' | 'remove' | undefined) => () => {
      runAvatarEditActions(type);
    },
  };

  async function runCoverEditActions(type: 'upload' | 'remove' | undefined) {
    switch (type) {
      case 'upload':
        const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
        const resp = await uploadImage(webPath);
        form.controls.cover_image.setValue(resp.id);
        setCoverImage(resp.url);
        break;
      case 'remove':
        form.controls.cover_image.setValue(undefined);
        setCoverImage(undefined);
        break;
    }
  }

  const onCoverEdit = {
    mobile: async () => {
      const actionResp = await showActionSheet();
      runCoverEditActions(actionResp);
    },
    desktop: (type: 'upload' | 'remove' | undefined) => () => {
      runCoverEditActions(type);
    },
  };

  async function updateIdentityList() {
    return identities().then((resp) => dispatch(setIdentityList(resp)));
  }

  async function onSave() {
    if (form.isValid) {
      try {
        const rawPayload = getFormValues(form);
        const payload = removedEmptyProps(rawPayload);
        await endpoint.post.organizations['orgs/update/{org_id}'](organization.id, {
          ...payload,
          shortname: organization.shortname,
        });
        await updateIdentityList();
        navigate('/jobs');
      } catch (err) {
        console.error(err);
      }
    } else {
      dialog.alert({ message: 'form is invalid' });
    }
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
    updateIdentityList,
  };
};


import { Camera } from '@capacitor/camera';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { DropdownItem } from 'src/components/atoms/dropdown-v2/dropdown.types';
import { getIdentities } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';
import { useForm } from 'src/core/form';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { removedEmptyProps } from 'src/core/utils';
import { ProfileReq } from 'src/pages/profile-organization/profile-organization.types';
import { setIdentityList } from 'src/store/reducers/identity.reducer';

import { generateFormModel } from './profile-user-edit.form';
import { cityDispatcher, showActionSheet, uploadImage } from './profile-user-edit.services';
import { EditProps } from '../profile-user/desktop/edit/edit.types';

export const useProfileUserEditShared = (props?: EditProps) => {
  const user = useMatch().data.user as ProfileReq;
  const formModel = useMemo(() => generateFormModel(user), []);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const form = useForm(formModel);
  const updateCityList = cityDispatcher(setCities);
  const [coverImage, setCoverImage] = useState(user?.cover_image?.url);
  const [avatarImage, setAvatarImage] = useState(user?.avatar?.url);
  const navigate = {};
  const dispatch = useDispatch();

  async function runCoverEditActions(type: 'upload' | 'remove' | undefined) {
    switch (type) {
      case 'upload':
        try {
          const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
          const resp = await uploadImage(webPath);
          form.controls.cover_image.setValue(resp.id);
          setCoverImage(resp.url);
        } catch (error) {
          console.log('runCoverEditActions: ', error);
        }
        break;
      case 'remove':
        form.controls.cover_image.setValue('');
        setCoverImage(undefined);
        break;
    }
  }

  async function runAvatarEditActions(type: 'upload' | 'remove' | undefined) {
    switch (type) {
      case 'upload':
        const { webPath } = await Camera.pickImages({ limit: 1 }).then(({ photos }) => photos[0]);
        const resp = await uploadImage(webPath);
        form.controls.avatar.setValue(resp.id);
        setAvatarImage(resp.url);
        break;
      case 'remove':
        form.controls.avatar.setValue(undefined);
        setAvatarImage(undefined);
        break;
    }
  }

  const onCoverEdit = {
    mobile: async () => {
      try {
        const actionResp = await showActionSheet();
        runCoverEditActions(actionResp);
      } catch (error) {
        console.log('onCoverEdit: ', error);
      }
    },
    desktop: async (type: 'upload' | 'remove' | undefined) => {
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
    },
  };

  async function updateIdentityList() {
    return getIdentities().then((resp) => dispatch(setIdentityList(resp)));
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

  function onCountryUpdate(option: DropdownItem) {
    updateCityList(option.value as string);
  }

  function onSave() {
    if (form.isValid) {
      const rawPayload = getFormValues(form);
      const payload = removedEmptyProps(rawPayload);
      endpoint.post.user['update/profile'](payload).then(async () => {
        await updateIdentityList();
        navigate({ to: '/jobs' });
      });
    } else {
      dialog.alert({ message: 'form is invalid' });
    }
  }

  function onSaveDesktop() {
    if (form.isValid) {
      const rawPayload = getFormValues(form);
      const payload = removedEmptyProps(rawPayload);
      endpoint.post.user['update/profile'](payload).then(async (resp) => {
        await updateIdentityList();
        props?.updateUser(resp);
        props?.onClose();
      });
    } else {
      dialog.alert({ message: 'form is invalid' });
    }
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
    updateIdentityList,
    onSaveDesktop,
    form,
  };
};

import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { createPost, CurrentIdentity, SocialCauses, uploadMedia } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';
import * as yup from 'yup';

import { Form, OptionType } from './index.types';

const schema = yup
  .object()
  .shape({
    cause: yup
      .object()
      .nullable()
      .shape({
        label: yup.string().required('Required'),
        value: yup.string(),
      }),
    content: yup.string().required('Content is required'),
    file: yup.mixed().nullable().required('You should select an Image'),
    title: yup.string(),
  })
  .required();

export const useCreatePostModal = (handleClose: () => void, onCreatePost: () => void, data?: Form) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const { profileImage, name, username } = getIdentityMeta(currentIdentity);
  const causesKeys = Object.keys(SOCIAL_CAUSES);
  const causesList = causesKeys.map(causeskey => {
    return { value: SOCIAL_CAUSES[causeskey].value, label: SOCIAL_CAUSES[causeskey].label };
  });
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [focusElements, setFocusElements] = useState<{ title: boolean; content: boolean }>({
    title: false,
    content: false,
  });
  const {
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    watch,
    reset,
  } = useForm<Form>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const titleVal = watch('title');
  const contentVal = watch('content');

  const initializeValues = () => {
    const initialVal = {
      cause: data?.cause,
      content: data?.content || '',
      file: data?.file,
      title: data?.title || '',
    };
    reset(initialVal);
  };

  useEffect(() => initializeValues(), [data]);

  const onSelectCause = (option: OptionType) => setValue('cause', option);

  const onTextChange = (name: 'title' | 'content', value: string) => setValue(name, value);

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = (e.target.files && e.target.files[0]?.name.split('.').pop()?.toLowerCase()) || '';
    clearErrors('file');
    if (!e.target.files || e.target.files.length === 0) {
      setValue('file', null);
      return;
    } else if (e.target.files[0].size > MAX_IMAGE_SIZE) {
      setError('file', { message: 'Image should be less than 5MB' });
      setValue('file', null);
      return;
    } else if (!allowedExtensions.includes(fileExtension)) {
      setError('file', { message: 'Image should has jpg/jpeg/png/gif format' });
    }
    setValue('file', e.target.files[0]);
  };

  const onSubmitPost: SubmitHandler<Form> = async ({ cause, title, content, file }) => {
    try {
      if (file) {
        const { id: mediaId } = (await uploadMedia(file)) || {};
        await createPost({ causes_tags: [(cause?.value as SocialCauses) || ''], title, content, media: [mediaId] });
      }
      onCreatePost();
      handleClose();
      reset();
    } catch (error) {
      console.log('error in creating post', error);
    }
  };

  return {
    data: { profileImage, name, username, causesList, titleVal, contentVal, openEmojiPicker, focusElements, errors },
    operations: {
      onSelectCause,
      onTextChange,
      onUploadImage,
      setFocusElements,
      setOpenEmojiPicker,
      handleSubmit,
      onSubmitPost,
    },
  };
};

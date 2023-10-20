import { PostMediaUploadRes } from './media.types';
import { get, post } from '../http';

export async function getMedia(id: string): Promise<PostMediaUploadRes> {
  return (await get<PostMediaUploadRes>(`/media/${id}`)).data;
}

export async function uploadMedia(file: File): Promise<PostMediaUploadRes> {
  const formData = new FormData();
  formData.append('file', file);
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return (await post<PostMediaUploadRes>('/media/upload', formData, header)).data;
}

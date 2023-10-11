import { PostMediaUploadRes } from './media.types';
import { get } from '../http';

export async function getMedia(id: string): Promise<Media> {
  return (await get<Media>(`/media/${id}`)).data;
}

export async function uploadMedia(file: File): Promise<Media> {
  const formData = new FormData();
  formData.append('file', file);
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return (await post<Media>('/media/upload', formData, header)).data;
}

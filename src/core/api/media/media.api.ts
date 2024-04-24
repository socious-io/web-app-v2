import { PostMediaUploadRes } from './media.types';
import { get, post } from '../http';

export async function getMedia(id: string): Promise<PostMediaUploadRes> {
  return (await get<PostMediaUploadRes>(`/media/${id}`)).data;
}

export async function uploadMedia(file: File): Promise<PostMediaUploadRes> {
  const formData = new FormData();
  formData.append('file', file);
  return (await post<PostMediaUploadRes>('/media/upload', formData)).data;
}

export async function uploadMediaWithProgress(
  file: File,
  setProgress: (val: number) => void,
): Promise<PostMediaUploadRes> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await post<PostMediaUploadRes>('/media/upload', formData, {
    onUploadProgress: progressEvent => {
      if (progressEvent?.total) {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentage);
      }
    },
  });
  return res.data;
}

import { PostMediaUploadRes } from './media.types';
import { get } from '../http';

export async function getMedia(id: string): Promise<PostMediaUploadRes> {
  return (await get<PostMediaUploadRes>(`/media/${id}`)).data;
}

import { post } from 'src/core/http';

export async function uploadImage(file: string) {
  const formData = new FormData();
  formData.append('file', file);
  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return post('/media/upload', formData, header);
}

import { get, post } from '../../../../core/http';

export async function getFeedList({ page } = { page: 1 }) {
  return get(`posts?page=${page}`).then(({ data }) => data);
}

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

type PostPayloadReq = {
  causes_tags: string[];
  content: string;
  media: string[];
};

export async function submitPost(payload: PostPayloadReq) {
  return post('/posts', payload).then(({ data }) => data);
}

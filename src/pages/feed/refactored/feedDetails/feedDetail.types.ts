import { Post } from 'src/core/api';

export type MobileProps = {
  data: Post;
};

export type CommentModel = {
  content: string;
  created_at: string;
  id: string;
  likes: number;
  liked: boolean;
  post_id: string;
  identity_meta: IdentityMeta;
  identity_type: 'organizations' | 'users';
};

type IdentityMeta = {
  name: string;
  avatar: string;
  image: string;
};

export type PostMediaUploadRes = {
  id: string;
  identity_id: string;
  filename: string;
  url: string;
  created_at: string;
};

export type Media = {
  id: string;
  identity_id?: string;
  filename: string;
  url: string;
  created_at?: string;
};

export interface MediaMeta {
  id: string;
  url: string;
}

export interface Media extends MediaMeta {
  filename: string;
  identity_id: string;
  created_at: string;
}

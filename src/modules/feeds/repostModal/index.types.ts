type RepostedData = {
  profileImage: string;
  name: string;
  username: string;
  date: string;
  cause: string;
  content: string;
  media: string;
  title?: string;
};

export interface RepostModalProps {
  data: RepostedData;
  open: boolean;
  handleClose: () => void;
  onRepost: (content: string) => void;
}

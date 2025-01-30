export interface SearchModalProps {
  onClose: () => void;
  open: boolean;
  setSearchText: (s: string) => void;
}
export type TabValue = 'users' | 'organizations' | 'projects' | 'services';
export interface SearchItem {
  title: string;
  username: string;
  image: string;
  isAvailable?: boolean;
  id: string;
  type: TabValue;
  bio: string;
  isVerified: boolean;
}

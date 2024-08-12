import { SearchItem } from 'src/modules/Search/containers/SearchModal/SearchModal.types';

export interface ResultListProps {
  list: SearchItem[];
  onClose: () => void;
}

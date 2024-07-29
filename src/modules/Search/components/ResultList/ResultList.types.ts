import { SearchItem } from '../../containers/SearchModal/SearchModal.types';

export interface ResultListProps {
  list: SearchItem[];
  onClose: () => void;
}

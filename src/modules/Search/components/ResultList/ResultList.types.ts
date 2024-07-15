interface SearchItem {
  id: string;
  title: string;
}
export interface ResultListProps {
  list: SearchItem[];
  onClose: () => void;
}

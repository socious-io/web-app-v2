interface SearchItem {
  title: string;
}
export interface ResultListProps {
  list: SearchItem[];
  onClose: () => void;
}

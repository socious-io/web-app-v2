interface SearchItem {
  title: string;
}
export interface ResultListProps {
  list: SearchItem[];
  onClose: () => void;
  loadMore?: (p: number) => void | undefined;
  hasMore?: boolean;
}

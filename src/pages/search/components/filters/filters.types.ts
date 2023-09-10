export interface FiltersProps {
  filterdItems: Array<{
    title: string;
    list: Array<{ label: string; value: string }>;
    onEdit: () => void;
    onRemove: (item: string) => void;
  }>;
}

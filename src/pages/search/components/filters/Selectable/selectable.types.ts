interface SelectableProps {
  title: string;
  onEdit: () => void;
  onRemove: (item: string) => void;
  list: Array<{ label: string; value: string }>;
}

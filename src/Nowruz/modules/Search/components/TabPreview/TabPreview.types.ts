export type Tab = { label: string; value: string };

export interface TabPreviewProps {
  tabs: Tab[];
  onSelect: (tab: Tab) => void;
}

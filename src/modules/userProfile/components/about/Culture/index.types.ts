export interface CultureProps {
  items: {
    title: string;
    value: string;
    description?: string;
  }[];
  onOpenPreferences: () => void;
}

export type TabsProps = {
  tabs: Tab[];
  onClick?: (name: string) => void;
  alignLeft: boolean
};

export type Tab = {
  name: string;
  content: React.ReactElement;
  default?: boolean;
};
export type TabsProps = {
  tabs: Tab[];
};

export type Tab = {
  name: string;
  content: React.ReactElement;
  default?: boolean;
};

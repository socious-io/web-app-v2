export interface ValueAccordionItem {
  key: string;
  title: string;
  subtitle: string;
  selected: boolean;
  description?: string;
}

export interface ValueAccordionProps {
  title: string;
  items: ValueAccordionItem[];
}

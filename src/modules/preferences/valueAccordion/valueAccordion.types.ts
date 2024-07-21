export interface ValueAccordionItem {
  title: string;
  subtitle: string;
  selected: boolean;
}

export interface ValueAccordionProps {
  title: string;
  items: ValueAccordionItem[];
}

export interface AccordionProps {
  title: string;
  content: string;
  icon?: boolean;
  expanded?: boolean;
  divider?: boolean;
  breakpoint: 'desktop' | 'mobile';
  iconPosition: 'right' | 'left';
}

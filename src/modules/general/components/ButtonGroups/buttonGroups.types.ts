export type ButtonGroupItem = {
  label: string;
  value?: string;
  handleClick: () => void;
};

export interface ButtonGroupsProps {
  buttons: ButtonGroupItem[];
  activeIndex?: number;
}

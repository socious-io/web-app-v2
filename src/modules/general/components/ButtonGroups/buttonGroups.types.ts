export type ButtonGroupItem = {
  label: string;
  handleClick: () => void;
};

export interface ButtonGroupsProps {
  buttons: ButtonGroupItem[];
  activeIndex?: number;
}

export type ButtonGroupItem = {
  label: string;
  handleClick: () => Promise<void>;
};

export interface ButtonGroupsProps {
  buttons: ButtonGroupItem[];
}

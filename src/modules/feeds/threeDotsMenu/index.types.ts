export interface ThreeDotsMenuProps {
  open: boolean;
  handleClose: () => void;
  menuItems: { iconName: string; title: string; onClick: () => void }[];
}

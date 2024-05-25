export interface MenuItem {
  iconName: string;
  title: string;
  onClick: () => void;
}
export interface ThreeDotButtonProps {
  menuItems: MenuItem[];
}

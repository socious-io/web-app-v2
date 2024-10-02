export interface LinksContainerProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

export interface MenuProps {
  label: string;
  route: string;
  iconName: string;
  public: boolean;
  children?: { label: string; route: string; public: boolean }[] | undefined;
  badgeIcon?: React.ReactNode | undefined;
  only?: 'users' | 'organizations' | undefined;
}

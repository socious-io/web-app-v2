export type MobileProps = {
  title: string;
};

export type AccountsModel = {
  image?: string;
  avatar?: string;
  name: string;
  type: 'users' | 'organizations';
  id: string;
  current: boolean;
};

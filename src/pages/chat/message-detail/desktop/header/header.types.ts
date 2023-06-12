export interface HeaderProps {
  name: string;
  type: 'users' | 'organizations';
  username?: string;
  img?: string;
  lastOnline?: string;
}

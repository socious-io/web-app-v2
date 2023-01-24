export interface HeaderProps {
  onBack?: () => void;
  type: 'users' | 'organizations';
  name: string;
  img?: string;
  lastOnline?: string;
}

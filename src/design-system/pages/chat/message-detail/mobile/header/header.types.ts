export interface HeaderProps {
  onBack?: () => void;
  type: 'users' | 'organizations';
  name: string;
  lastOnline: string;
}

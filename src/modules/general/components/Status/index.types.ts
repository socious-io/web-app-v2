export interface StatusProps {
  icon?: string;
  label: string;
  theme: 'primary' | 'secondary' | 'grey_blue' | 'error' | 'warning' | 'success';
  transparent?: boolean;
}

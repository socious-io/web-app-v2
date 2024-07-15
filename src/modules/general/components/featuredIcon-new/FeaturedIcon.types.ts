export interface FeaturedIconProps {
  type: 'light-circle' | 'light-circle-outlined' | 'dark-circle' | 'modern';
  theme: 'primary' | 'gray' | 'error' | 'warning' | 'success';
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  iconName: string;
}

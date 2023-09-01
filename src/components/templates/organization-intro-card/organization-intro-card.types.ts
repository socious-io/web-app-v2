export interface OrganizationIntroCardProps {
  title: string;
  description: string;
  logo: string;
  customStyle?: string;
  link: { url: string; label: string };
  impact: { following: number; followers: number };
}

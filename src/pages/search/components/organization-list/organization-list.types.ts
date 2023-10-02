export interface OrganizationListProps {
  data: Organization[];
  onMorePageClick: () => void;
  onClick: (name: string) => void;
  showMorePage: boolean;
}
type Organization {
    shortname:string;
    bio:string;
    name:string;
    social_causes:string[];
    hiring:boolean;
    id:string;
    city:string;
}
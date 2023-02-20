export type AddOrganizationPayload = {
  type: string;
  social_causes: string[];
  name: string;
  bio: string;
  email: string;
  country: string;
  city: string;
  geoname_id: number;
  phone?: string;
  mission?: string;
  culture?: string;
  mobile_country_code?: string;
  address?: string;
  website?: string;
  //   description: string;
};

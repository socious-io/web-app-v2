import { BADGES } from '../../../core/constants/constants';

export type ImpactCategoryItemProps = {
  color: string;
  iconUrl: string;
  label: string;
};

type Item = {
  id: string;
  total_points: number;
  mission_id: string;
  identity_id: string;
  social_cause: string;
  //   social_cause_category: keyof typeof SDG;
  created_at: string;
  mission: Mission;
};

type Mission = {
  id: string;
  assignee_id: string;
  project_id: string;
  applicant_id: string;
  created_at: string;
  complete_at: string;
  updated_at: string;
  assigner_id: string;
  offer_id: string;
  status: string;
};

import { BADGES } from '../../../constants/constants';

export type ImpactBadgeProps = {
  color: string;
  iconUrl: string;
  size?: string;
};

type KEYS = keyof typeof BADGES;

export type Badge = Record<KEYS, ImpactBadgeProps>;

import {SDG} from './impact-badge.constant';

export type ImpactBadgeProps = {
  name: string;
};

type KEYS = keyof typeof SDG;

export type Badge = Record<KEYS, {name: string; color: string}>;

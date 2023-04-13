import { TIERS, Tiers } from 'src/constants/TIERS_TABLE';
import { get } from '../../core/http';
import { BadgesResp } from '../../core/types';

export async function getBadges(): Promise<BadgesResp> {
  return get('/user/badges').then(({ data }) => data);
}

export async function getImpactPoints() {
  return get('/user/impact-points').then(({ data }) => data);
}

export function getTierRowBasedOnCurrentTier(currentTier: number): Tiers | undefined {
  return TIERS.find((item) => item.tier === currentTier);
}

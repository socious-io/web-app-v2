import { TIERS, Tiers } from 'src/constants/TIERS_TABLE';
import { Badges, badges, ImpactPoints, impactPoints } from 'src/core/api';

export async function getBadges(): Promise<Badges> {
  return badges();
}

export async function getImpactPoints(): Promise<ImpactPoints> {
  return impactPoints({ limit: 100 });
}

export function getTierRowBasedOnCurrentTier(currentTier: number): Tiers | undefined {
  return TIERS.find((item) => item.tier === currentTier);
}

import { TIERS } from '../../../constants/TIERS_TABLE';

export function evaluateTier(points: number) {
  const currentTier = TIERS.find(({ min, max }) => min < points && max > points);
  if (currentTier !== undefined) {
    return {
      prev: currentTier.tier === 0 ? 1 : currentTier.tier - 1,
      current: currentTier.tier,
      next: currentTier.tier + 1,
      prevPoint: currentTier.min,
      nextPoint: currentTier.max,
      currentPoint: points,
    };
  }
  return {
    prev: 0,
    current: 1,
    next: 2,
    prevPoint: TIERS[0].min,
    nextPoint: TIERS[0].max,
    currentPoint: points,
  };
}

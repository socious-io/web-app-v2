import { TIERS } from 'src/constants/TIERS';

export const getTierDetails = (impactPoints: number) => {
  const tier = TIERS.find(({ min, max }) => impactPoints >= min && impactPoints <= max);

  if (!tier)
    return {
      tier: 0,
      min: 0,
      max: 0,
      progressPercent: 0,
      pointsLeft: 0,
    };

  const progressPercent = ((impactPoints - tier.min) / (tier.max - tier.min)) * 100;
  const pointsLeft = tier.max - impactPoints + 1;
  return {
    tier: tier.tier,
    min: tier.min,
    max: tier.max,
    progressPercent: Math.min(Math.max(progressPercent, 0), 100),
    pointsLeft,
  };
};

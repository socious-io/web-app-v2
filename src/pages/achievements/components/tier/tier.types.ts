export type TierProps = {
  currentTier: number;
  tier: Tier;
};

export type Tier = {
  prev: number;
  current: number;
  next: number;
  prevPoint: number;
  nextPoint: number;
  currentPoint: number;
};

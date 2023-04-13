export type HeaderProps = {
  point: number;
  onClaimNow: () => void;
  onCheckRewards: () => void;
  tier: {
    prev: number;
    current: number;
    next: number;
    prevPoint: number;
    nextPoint: number;
    currentPoint: number;
  };
};

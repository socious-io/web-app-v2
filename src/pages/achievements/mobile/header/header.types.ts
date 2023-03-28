export type HeaderProps = {
  point: number;
  onClaimNow: () => void;
  tier: {
    prev: number;
    current: number;
    next: number;
    prevPoint: number;
    nextPoint: number;
    currentPoint: number;
  };
};

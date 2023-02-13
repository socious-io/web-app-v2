export type HeaderProps = {
  point: number;
  tier: {
    prev: number;
    current: number;
    next: number;
    prevPoint: number;
    nextPoint: number;
    currentPoint: number;
  };
};

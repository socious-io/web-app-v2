export const getBadgeLevel = (points: number) => {
  let level = 0;
  if (points <= 535) {
    level = 1;
  } else if (points <= 8576) {
    level = 2;
  } else {
    level = 3;
  }
  return level;
};

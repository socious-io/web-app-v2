export function isTouchDevice(): boolean {
  return window.innerWidth < 400;
  //   return true;
  //   return window.matchMedia('(pointer: coarse)').matches;
}

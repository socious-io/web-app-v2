export function isTouchDevice(): boolean {
  return window.innerWidth < 600;
  //   return true;
  //   return window.matchMedia('(pointer: coarse)').matches;
}

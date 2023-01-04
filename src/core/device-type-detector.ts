export function isTouchDevice(): boolean {
  return window.orientation > -1;
  //   return window.matchMedia('(pointer: coarse)').matches;
}

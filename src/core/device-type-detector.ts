import { isMobile } from 'react-device-detect';

export function isTouchDevice(): boolean {
  return isMobile;
}

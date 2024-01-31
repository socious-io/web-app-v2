import { isTouchDevice } from 'src/core/device-type-detector';

import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';

export const Intro = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;
};

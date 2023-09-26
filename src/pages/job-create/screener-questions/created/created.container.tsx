import { isTouchDevice } from 'src/core/device-type-detector';
import { Mobile } from './mobile/mobile';

export const Created: React.FC = () => {
  return isTouchDevice() ? <Mobile /> : <></>;
};

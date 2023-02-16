import { useMatch } from '@tanstack/react-location';
import { isTouchDevice } from '../../../core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';

export const Notifications = (): JSX.Element => {
  const data = useMatch().ownData;


  return isTouchDevice() ? (
    <Mobile list={data} />
  ) : (
    <Desktop />
  );
};

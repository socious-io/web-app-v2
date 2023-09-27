import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';
import { isTouchDevice } from '../../../core/device-type-detector';

export const Profile = (): JSX.Element => (isTouchDevice() ? <Mobile /> : <Desktop />);

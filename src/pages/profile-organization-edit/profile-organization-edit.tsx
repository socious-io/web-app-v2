import { isTouchDevice } from '../../core/device-type-detector';
import { Mobile } from './mobile/mobile';

export const ProfileOrganizationEdit = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <></>;
};

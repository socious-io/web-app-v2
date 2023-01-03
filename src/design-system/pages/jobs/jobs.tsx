import { useMatch } from '@tanstack/react-location';
import { isTouchDevice } from '../../../core/device-type-detector';
import { JobsCursor } from './jobs-cursor/jobs-cursor';
import { JobsTouch } from './jobs-touch/jobs-touch';

export const Jobs = (): JSX.Element => {
  const { data } = useMatch();

  return isTouchDevice() ? (
    <JobsTouch list={data.items} />
  ) : (
    <JobsCursor list={data.items} />
  );
};

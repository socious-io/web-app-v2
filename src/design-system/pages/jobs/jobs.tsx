import { useMatch } from '@tanstack/react-location';
import { isTouchDevice } from '../../../core/device-type-detector';
import { JobsCursor } from './jobs-cursor/jobs-cursor';
import { JobsTouch } from './jobs-touch/jobs-touch';

export const Jobs = (): JSX.Element => {
  const { data } = useMatch();

  return isTouchDevice() ? (
    // @ts-ignore
    <JobsTouch list={data.items} />
  ) : (
    // @ts-ignore
    <JobsCursor list={data.items} />
  );
};

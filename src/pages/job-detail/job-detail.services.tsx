import { get } from '../../core/http';
import { Job } from '../../components/organisms/job-list/job-list.types';
import { translateProjectType } from 'src/constants/PROJECT_TYPES';
import { translateProjectLength } from 'src/constants/PROJECT_LENGTH';
import { when } from 'src/core/utils';
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';

export function getCategories(job: Job): Array<JSX.Element | string> {
  const list: Array<JSX.Element | string> = [];
  const location = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/pin.svg" />
      {job.city}, {job.country}
    </>
  );
  const projectType = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/part-time.svg" />
      {translateProjectType(job.project_type)}
    </>
  );
  const projectLength = () => (
    <>
      <img style={{ marginRight: '2px' }} src="/icons/time.svg" />
      {translateProjectLength(job.project_length)}
    </>
  );

  when(job.country, () => list.push(location()));
  when(job.project_type, () => list.push(projectType()));
  when(job.project_length, () => list.push(projectLength()));
  when(job.remote_preference, () => list.push(translateRemotePreferences(job.remote_preference)));

  return list;
}

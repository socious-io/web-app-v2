import { translate } from 'src/core/utils';

export const PROJECT_TYPE = [
  { title: translate('project_type.one_off'), value: 'ONE_OFF' },
  { title: translate('project_type.part_time'), value: 'PART_TIME' },
  { title: translate('project_type.full_time'), value: 'FULL_TIME' },
];

export const PROJECT_TYPE_V2 = [
  { label: translate('project_type.one_off'), value: 'ONE_OFF' },
  { label: translate('project_type.part_time'), value: 'PART_TIME' },
  { label: translate('project_type.full_time'), value: 'FULL_TIME' },
];

export const PROJECT_TYPE_DICT = {
  ONE_OFF: translate('project_type.one_off'),
  PART_TIME: translate('project_type.part_time'),
  FULL_TIME: translate('project_type.full_time'),
};

export const translateProjectType = (value: string) => {
  if (PROJECT_TYPE_DICT[value]) {
    return PROJECT_TYPE_DICT[value];
  }
  return '';
};

export const PROJECT_TYPE = [
  { title: 'One-off', value: 'ONE_OFF' },
  { title: 'Part-time', value: 'PART_TIME' },
  { title: 'Full-time', value: 'FULL_TIME' },
];

export const PROJECT_TYPE_DICT = {
  ONE_OFF: 'One-off',
  PART_TIME: 'Part-time',
  FULL_TIME: 'Full-time',
};

export const translateProjectType = (value: string) => {
  if (PROJECT_TYPE_DICT[value]) {
    return PROJECT_TYPE_DICT[value];
  }
  return '';
};

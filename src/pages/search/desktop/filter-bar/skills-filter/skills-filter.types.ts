export type SkillsFilterProps = {
  onSubmit: (values: Array<{ label: string; value: string }>) => void;
  open: boolean;
  onClose: () => void;
  selectedSkills: string[];
};

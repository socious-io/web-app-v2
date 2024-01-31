export type SocialCausesFilterProps = {
  onSubmit: (values: Array<{ label: string; value: string }>) => void;
  value?: string[];
  open: boolean;
  onClose: () => void;
};

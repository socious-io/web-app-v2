export type LocationFilterProps = {
  onSubmit: (country: { label: string; value: string }, city: { label: string; value: string }) => void;
  open: boolean;
  onClose: () => void;
};

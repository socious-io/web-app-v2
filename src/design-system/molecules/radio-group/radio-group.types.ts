export type RadioGroupProps = {
  label: string;
  name: string;
  value: string;
  list: { label: string; value: string }[];
  onChange: (value: string) => void;
};

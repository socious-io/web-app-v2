export type SelectCardGroupItem = {
  value: string;
  label: string;
};

export interface SelectCardGroupProps {
  items: SelectCardGroupItem[];
  selected?: SelectCardGroupItem;
  value?: SelectCardGroupItem;
  setValue: (newVal: SelectCardGroupItem) => void;
  defaultValue?: SelectCardGroupItem;
}

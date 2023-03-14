import { DropdownItem } from './dropdown.types';

export function setInitialValue(list: DropdownItem[], value?: string | number): string {
  const obj = list.find((item) => item.value === value);
  return obj ? obj.label : '';
}

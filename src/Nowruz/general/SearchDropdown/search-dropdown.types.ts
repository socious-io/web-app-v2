import { AutocompleteProps } from '@mui/material/Autocomplete';
import { FunctionComponent } from 'react';

export interface SearchDropdownProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends FunctionComponent<any>,
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent> {
  placeholder: string;
}

export interface Option {
  label: string;
  subtitle?: string;
  avatar?: string;
  img?: string;
  value: string;
}

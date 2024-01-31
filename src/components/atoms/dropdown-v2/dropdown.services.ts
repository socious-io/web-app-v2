import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';

import { DropdownProps } from './dropdown.types';

export function getInitialValue(props: DropdownProps): string {
  if (props.register && props.name) {
    return props.register.controls[props.name].value as string;
  }
  return '';
}

import { REGEX } from '../../../constants/REGEX';
import { ControlPrimitiveValue, Validator } from '../useForm/useForm.types';

export const email = (): Validator => ({
    name: 'email',
    message: 'incorrect email',
    validateWith: (value: ControlPrimitiveValue) => REGEX.email.test(value as string),
});

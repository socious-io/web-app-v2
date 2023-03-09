import { REGEX } from '../../../constants/REGEX';
import { ControlPrimitiveValue, Validator } from '../useForm/useForm.types';

export const email = (): Validator => ({
    name: 'email',
    message: 'incorrect email',
    validateWith: (value: ControlPrimitiveValue) => REGEX.email.test(value as string),
});

export const website = (): Validator => ({
    name: 'website',
    message: 'incorrect URL',
    validateWith: (value: ControlPrimitiveValue) => {
        if (value === '') {
            return true;
        }
        return /^(ftp|http|https):\/\/[^ "]+$/.test(value as string);
    },
});

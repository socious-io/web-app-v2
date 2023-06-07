import { REGEX } from '../../../constants/REGEX';
import { ControlPrimitiveValue, Validator } from '../useForm/useForm.types';

export const email = (): Validator => ({
    name: 'email',
    message: 'incorrect email',
    validateWith: (value: ControlPrimitiveValue) => REGEX.email.test(value as string),
});

export const noEmptyString = (): Validator => ({
    name: 'noEmptyString',
    message: 'field is required',
    validateWith: (value: ControlPrimitiveValue) => {
        return (value as string).trim().length > 0;
    },
});

export const number = (): Validator => ({
    name: 'number',
    message: 'value should be a number',
    validateWith: (value: ControlPrimitiveValue) => {
        return /^[0-9]*$/.test(value as string);
    },
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

export const minArrayLength = (option: {message: string; minValue: number}): Validator => ({
    name: 'minArrayLength',
    message: option.message,
    validateWith: (value: ControlPrimitiveValue) => {
        return (value as Array<unknown>).length >= option.minValue;
    },
});

export const maxArrayLength = (option: {message: string; maxValue: number}): Validator => ({
    name: 'maxArrayLength',
    message: option.message,
    validateWith: (value: ControlPrimitiveValue) => {
        return (value as Array<unknown>).length <= option.maxValue;
    },
});
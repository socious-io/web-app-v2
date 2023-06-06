import { ControlPrimitiveValue, Validator } from './useForm.types';

export const min = (minValue: number, message?: string): Validator => {
    return {
        name: 'min',
        validateWith: (value: ControlPrimitiveValue) => {
            if (typeof value === 'number') {
                return value >= minValue;
            }
            if (typeof value === 'string' && Number(value)) {
                return Number(value) >= minValue;
            }
            // console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value must be equal or grater than ${minValue}`,
    };
};

// export const maxLengthArray = (maxValue: number, message?: string): Validator => {
//     return {
//         name: 'maxLengthArray',
//         validateWith: (value: ControlPrimitiveValue) => {
//             if (Array.isArray(value)) {
//                 return value.length <= 10;
//             } else {
//             console.error(`input value is of type ${typeof value} instead of Array`);
//             return false;
//         }
//         },
//         message: message || `value length must be equal or less than ${maxValue}`,
//     };
// };

export const max = (maxValue: number, message?: string): Validator => {
    return {
        name: 'max',
        validateWith: (value: ControlPrimitiveValue) => {
            if (typeof value === 'number') {
                return value <= maxValue;
            }
            if (typeof value === 'string' && Number(value)) {
                return Number(value) <= maxValue;
            }
            // console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value must be equal or less than ${maxValue}`,
    };
};

export const maxLength = (maxValue: number, message?: string): Validator => {
    return {
        name: 'maxLength',
        validateWith: (value: ControlPrimitiveValue) => {
            if (typeof value === 'string') {
                return value.length <= maxValue;
            }
            console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value length must be equal or less than ${maxValue}`,
    };
};

export const minLength = (minValue: number, message?: string): Validator => {
    return {
        name: 'minLength',
        validateWith: (value: ControlPrimitiveValue) => {
            if (typeof value === 'string') {
                return value.length >= minValue;
            }
            // console.error(`input value is of type ${typeof value}.`);
            return false;
        },
        message: message || `value length must be equal or greater than ${minValue}`,
    };
};

export const required = (message?: string): Validator => {
    return {
        name: 'required',
        validateWith: (value: ControlPrimitiveValue) => {
            return (
                value !== null && value !== undefined && value !== false && value !== ''
            );
        },
        message: message || 'field is required',
    };
};

export const pattern = (name: string, regex: RegExp, message?: string): Validator => {
    return {
        name,
        validateWith: (value: ControlPrimitiveValue) => {
            if (typeof value === 'string') {
                return regex.test(value);
            }
            return false;
        },
        message: message || 'incorrect pattern',
    };
};

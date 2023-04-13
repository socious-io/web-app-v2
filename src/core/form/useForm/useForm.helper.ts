/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChangeEvent, MutableRefObject } from 'react';
import {
    ControlError,
    ControlObjectModel,
    ControlPrimitiveValue,
    ControlRefs,
    Controls,
    FilterByTypeRadio,
    FilterNonInitialized,
    FormChangeEvent,
    SetAsInitialized,
    SetDefaultValue,
    Validator,
} from './useForm.types';

export const isTypeOfControlModel = (
    controlValueType: ControlPrimitiveValue | ControlObjectModel
): controlValueType is ControlObjectModel => {
    return typeof controlValueType === 'object';
};

export const setDefaultChecked = (value: ControlPrimitiveValue): boolean | undefined => {
    const valueIsBoolean = typeof value === 'boolean';
    return valueIsBoolean ? (value as boolean) : undefined;
};

export const setRadioInitialCheckedState = (
    controls: Controls,
    refs: MutableRefObject<ControlRefs>
): void => {
    const filterByTypeRadio: FilterByTypeRadio = ([controlName, { ref }]) => {
        const key = controlName.split('#')[0];
        return ref.type === 'radio' && ref.value === controls[key].value;
    };

    const setAsInitialized: SetAsInitialized = (item) => {
        // eslint-disable-next-line no-param-reassign
        item[1].initializeValueSet = true;
        return item;
    };

    const filterNonInitialized: FilterNonInitialized = ([, { initializeValueSet }]) =>
        !initializeValueSet;

    const setDefaultValue: SetDefaultValue = ([, { ref }]) => {
        // eslint-disable-next-line no-param-reassign
        ref.defaultChecked = true;
    };

    Object.entries(refs.current)
        .filter(filterNonInitialized)
        .map(setAsInitialized)
        .filter(filterByTypeRadio)
        .forEach(setDefaultValue);
};

export const generateControlErrorsProp = (
    value: ControlPrimitiveValue,
    validators: Validator[] = []
): ControlError => {
    // @ts-ignore
    return validators
        .filter((validator) => !validator.validateWith(value))
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.message }), {});
};

export const getValueBasedOnType = (e: FormChangeEvent): ControlPrimitiveValue => {
    const eventIsPrimitive = e && typeof e !== 'object';

    if (eventIsPrimitive) {
        return e;
    }

    const { target } = e as ChangeEvent<HTMLInputElement>;
    switch (target.type) {
        case 'checkbox':
            return (target as HTMLInputElement).checked;

        case 'radio':
            return (target as HTMLInputElement).value;

        case 'file':
            if (target.files) {
                return target.files[0];
            }
            console.warn('file input has returned undefined');
            return undefined;

        default:
            return target.value;
    }
};

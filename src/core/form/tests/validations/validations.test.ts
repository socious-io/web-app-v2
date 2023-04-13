import { ChangeEvent } from 'react';
import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
import { max, min, required } from '../../useForm/validations';

describe('validations', () => {
    test('should set "form.control.isValid" to true when "validators: []"', () => {
        const model: FormModel = {
            price: {
                initialValue: 'whatever',
                validators: [],
            },
        };
        const hook = renderHook(() => useForm(model));
        const { controls } = hook.result.current;

        expect(controls.price.isValid).toBe(true);
    });

    test('should set "form.control.isValid" to false when "validators: [min(n)]" evaluates to false on hook initialization', () => {
        const model: FormModel = {
            price: {
                initialValue: '5',
                validators: [min(6)],
            },
        };
        const hook = renderHook(() => useForm(model));
        const { controls } = hook.result.current;

        expect(controls.price.isValid).toBe(false);
    });

    test('should set "form.control.isValid" to false when "validators: [min(n)]" evaluates to false on value change', () => {
        const model: FormModel = {
            price: {
                initialValue: 2,
                validators: [min(2)],
            },
        };
        const hook = renderHook(() => useForm(model));
        const { bind, controls } = hook.result.current;

        act(() => {
            const change = { target: { value: '1' } } as ChangeEvent<HTMLInputElement>;
            bind('price').onChange(change);
        });

        expect(controls.price.isValid).toBe(false);
    });

    test('should generate form.control.errors object when control is not valid', () => {
        const model: FormModel = {
            price: {
                initialValue: 1,
                validators: [min(2, 'value should be at least 2'), max(10)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const { controls } = hook.result.current;

        expect(controls.price.errors).toEqual({ min: 'value should be at least 2' });
    });

    test('should update form.control.errors object when input changes to an invalid value', () => {
        const model: FormModel = {
            price: {
                initialValue: 2,
                validators: [min(2, 'value should be at least 2'), max(10)],
            },
        };

        const hook = renderHook(() => useForm(model));
        const { controls, bind } = hook.result.current;

        act(() => {
            const change = { target: { value: '1' } } as ChangeEvent<HTMLInputElement>;
            bind('price').onChange(change);
        });

        expect(controls.price.errors).toEqual({ min: 'value should be at least 2' });
    });

    test('should set "form.isValid" to true when no validation is defined', () => {
        const model: FormModel = {
            price: {
                initialValue: 0,
            },
        };

        const hook = renderHook(() => useForm(model));
        const form = hook.result.current;

        expect(form.isValid).toBe(true);
    });

    test('should set "form.isValid" to true when all validation passes', () => {
        const model: FormModel = {
            price: {
                initialValue: 5,
                validators: [min(2, 'value should be at least 2'), max(10), required()],
            },
        };

        const hook = renderHook(() => useForm(model));
        const { isValid } = hook.result.current;

        expect(isValid).toBe(true);
    });

    test('should set "form.isValid" to false when at least one validation does not pass', () => {
        const model: FormModel = {
            price: {
                initialValue: 11,
                validators: [min(2, 'value should be at least 2'), max(10), required()],
            },
        };

        const hook = renderHook(() => useForm(model));
        const { isValid } = hook.result.current;

        expect(isValid).toBe(false);
    });

    test.skip('should set "form.isValid" to true when value changes from wrong value to correct value', () => {
        const model: FormModel = {
            price: {
                initialValue: 11,
                validators: [min(2, 'value should be at least 2'), max(10), required()],
            },
        };

        const hook = renderHook(() => useForm(model));
        const { isValid, bind } = hook.result.current;

        expect(isValid).toBe(false);

        act(() => {
            const change = { target: { value: '6' } } as ChangeEvent<HTMLInputElement>;
            bind('price').onChange(change);
        });

        expect(isValid).toBe(true);
    });
});

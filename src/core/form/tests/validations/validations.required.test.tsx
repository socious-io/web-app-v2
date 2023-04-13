import { renderHook } from '@testing-library/react-hooks';
import { useForm } from '../../useForm/useForm';
import { FormModel } from '../../useForm/useForm.types';
import { required } from '../../useForm/validations';

describe('validations - max', () => {
    test('should set value to "form.control.isValid" to true when value of <input type="number"> is 0', () => {
        const formModel: FormModel = {
            price: {
                initialValue: 0,
                validators: [required()],
            },
        };
        const { controls } = renderHook(() => useForm(formModel)).result.current;

        expect(controls.price.isValid).toBe(true);
    });

    test('should set value to "form.control.isValid" to false when value of <input type="number"> is undefined', () => {
        const formModel: FormModel = {
            price: {
                initialValue: undefined,
                validators: [required()],
            },
        };
        const { controls } = renderHook(() => useForm(formModel)).result.current;

        expect(controls.price.isValid).toBe(false);
    });

    test('should set value to "form.control.isValid" to false when value of <input type="number"> is empty', () => {
        const formModel: FormModel = {
            price: {
                initialValue: '',
                validators: [required()],
            },
        };
        const { controls } = renderHook(() => useForm(formModel)).result.current;

        expect(controls.price.isValid).toBe(false);
    });

    test('should set value to "form.control.isValid" to false when value of <input type="number"> is null', () => {
        const formModel: FormModel = {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            price: {
                initialValue: null,
                validators: [required()],
            },
        };
        const { controls } = renderHook(() => useForm(formModel)).result.current;

        expect(controls.price.isValid).toBe(false);
    });

    test('should set "form.control.isValid" to true when value of <input type="checkbox" checked>', () => {
        const formModel: FormModel = {
            single: {
                initialValue: true,
                validators: [required()],
            },
        };

        const { controls } = renderHook(() => useForm(formModel)).result.current;

        expect(controls.single.isValid).toBe(true);
    });
});

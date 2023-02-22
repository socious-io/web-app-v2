import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';
import { maxLength, minLength, required } from '../useForm/validations';
import { generateChangeEvent } from './test.helper';

describe('addValidator', () => {
    test('should re-evaluate controls.name.isValid to false when new validator is added', () => {
        const model: FormModel = {
            firstName: {
                initialValue: '',
            },
        };
        const form = renderHook(() => useForm(model)).result.current;

        act(() => {
            form.controls.firstName.addValidator(minLength(5));
        });

        expect(form.controls.firstName.isValid).toBe(false);
    });

    test('should re-evaluate controls.name.isValid to true when new validator is added', () => {
        const model: FormModel = {
            firstName: {
                initialValue: 'sajad',
                validators: [minLength(2)],
            },
        };
        const form = renderHook(() => useForm(model)).result.current;

        expect(form.controls.firstName.isValid).toBe(true);

        act(() => {
            form.controls.firstName.addValidator(minLength(7));
        });

        expect(form.controls.firstName.isValid).toBe(false);
    });

    test('should re-evaluate formGroup.isValid to false when a newly falsy validator is added', () => {
        const model: FormModel = {
            firstName: {
                initialValue: 'sajad',
                validators: [minLength(2)],
            },
            lastName: {
                initialValue: 'abbasi',
                validators: [required()],
            },
        };
        const form = renderHook(() => useForm(model)).result.current;

        act(() => {
            form.controls.lastName.addValidator(maxLength(3));
        });

        expect(form.isValid).toBe(false);
    });

    test('should not effect valid state of other controls when new validator is added', () => {
        const model: FormModel = {
            firstName: {
                initialValue: 'sajad',
            },
            lastName: {
                initialValue: 'abbasi',
            },
        };
        const form = renderHook(() => useForm(model)).result.current;

        expect(form.controls.firstName.isValid).toBe(true);

        act(() => {
            form.controls.firstName.addValidator(minLength(7));
            form.bind('lastName').onChange(generateChangeEvent('sara'));
        });

        expect(form.controls.firstName.isValid).toBe(false);
        expect(form.controls.lastName.isValid).toBe(true);
    });

    test.todo(
        'should re-evaluate controls.name.isValid when new validator replaces old one'
    );
});

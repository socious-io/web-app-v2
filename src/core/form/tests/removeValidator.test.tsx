import { act, renderHook } from '@testing-library/react-hooks';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';
import { maxLength, minLength, required } from '../useForm/validations';

describe('removeValidator', () => {
    test('should re-evaluate controls.name.isValid when a validator is removed', () => {
        const model: FormModel = {
            firstName: {
                initialValue: '',
                validators: [required()],
            },
        };

        const form = renderHook(() => useForm(model)).result.current;

        expect(form.controls.firstName.isValid).toBe(false);

        act(() => {
            form.controls.firstName.removeValidator('required');
        });

        expect(form.controls.firstName.isValid).toBe(true);
    });

    test('should re-evaluate control when multiple validators are removed', () => {
        const model: FormModel = {
            name: {
                initialValue: 'sajad abbasi',
                validators: [required(), minLength(2), maxLength(7)],
            },
        };

        const form = renderHook(() => useForm(model)).result.current;

        expect(form.controls.name.isValid).toBe(false);

        act(() => {
            form.controls.name.removeValidator(['required', 'maxLength', 'minLength']);
        });

        expect(form.controls.name.isValid).toBe(true);
    });

    test('should re-evaluate formGroup.isValid when a validator is removed', () => {
        const model: FormModel = {
            firstName: {
                initialValue: '',
                validators: [required()],
            },
            lastName: {
                initialValue: '',
                validators: [],
            },
        };

        const form = renderHook(() => useForm(model)).result.current;
        expect(form.isValid).toBe(false);

        act(() => {
            form.controls.firstName.removeValidator('required');
        });

        expect(form.isValid).toBe(true);
    });

    test('should re-evaluate formGroup.isValid when multiple validators are removed', () => {
        const model: FormModel = {
            firstName: {
                initialValue: '',
                validators: [required(), minLength(2), maxLength(7)],
            },
            lastName: {
                initialValue: '',
                validators: [required(), minLength(2), maxLength(7)],
            },
        };

        const form = renderHook(() => useForm(model)).result.current;

        expect(form.isValid).toBe(false);

        act(() => {
            form.controls.firstName.removeValidator([
                'required',
                'maxLength',
                'minLength',
            ]);
            form.controls.lastName.removeValidator([
                'required',
                'maxLength',
                'minLength',
            ]);
        });
        expect(form.isValid).toBe(true);
    });
});

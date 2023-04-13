import { ChangeEvent } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { FormModel } from '../useForm/useForm.types';
import { useForm } from '../useForm/useForm';

describe('text', () => {
    test('should set "<textarea defaultValue={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            description: { initialValue: 'sajad' },
        };

        const hook = renderHook(() => useForm(formModel));
        const { bind } = hook.result.current;

        const { props } = <textarea {...bind('description')} />;
        expect(props.defaultValue).toBe('sajad');
    });

    test('should set "<textarea defaultValue={}>" to the given value in FormModel', () => {
        const formModel: FormModel = {
            description: 'sara',
        };

        const hook = renderHook(() => useForm(formModel));
        const { bind } = hook.result.current;

        const { props } = <textarea {...bind('description')} />;
        expect(props.defaultValue).toBe('sara');
    });

    test('should set form.description.value to defaultValue given in model', () => {
        const formModel: FormModel = {
            description: 'sajad',
        };
        const hook = renderHook(() => useForm(formModel));
        const { controls } = hook.result.current;

        expect(controls.description.value).toBe('sajad');
    });

    test('should update form.value on onChange event', () => {
        const formModel: FormModel = {
            description: '',
        };
        const hook = renderHook(() => useForm(formModel));
        const { bind, controls } = hook.result.current;

        act(() => {
            const change = {
                target: { value: 'sara' },
            } as ChangeEvent<HTMLTextAreaElement>;
            bind('description').onChange(change);
        });

        expect(controls.description.value).toBe('sara');
    });
});

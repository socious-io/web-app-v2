import { renderHook } from '@testing-library/react-hooks';
import { ChangeEvent } from 'react';
import { useForm } from '../useForm/useForm';
import { FormModel } from '../useForm/useForm.types';

describe('file', () => {
    test('should set "<input defaultValue={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            image: '',
        };
        const hook = renderHook(() => useForm(formModel));
        const { controls } = hook.result.current;

        expect(controls.image.value).toBe('');
    });

    test.skip('should set "<input defaultValue={}>" onChange', () => {
        const file = new File(['blob file'], 'fileName.jpeg', { type: 'image/jpeg' });

        const formModel: FormModel = {
            image: undefined,
        };
        const hook = renderHook(() => useForm(formModel));
        const { bind, controls } = hook.result.current;

        const change = {
            target: {
                type: 'change',
                value: 'C:\\fakepath\\Screen Shot 1400-12-25 at 18.54.16.png',
                files: [file],
            },
        } as unknown as ChangeEvent<HTMLInputElement>;

        bind('image').onChange(change);

        expect(controls.image.value).toBe(file);
    });
});

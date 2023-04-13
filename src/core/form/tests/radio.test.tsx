/* eslint-disable react/button-has-type */
import { render, screen } from '@testing-library/react';
import { act, renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import { useForm } from '../useForm/useForm';
import { FormChangeEvent, FormModel } from '../useForm/useForm.types';

describe('Radio', () => {
    test('should set "<input defaultValue={}>" to the given defaultValue in FormModel', () => {
        const formModel: FormModel = {
            contact: { initialValue: 'phone' },
        };
        const hook = renderHook(() => useForm(formModel));
        const { bind } = hook.result.current;

        const { props } = (
            <input type="radio" name="contact" id="phone" {...bind('contact')} />
        );

        expect(props.defaultValue).toBe('phone');
    });

    test('should set initial display value to model.initialValue', () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = {
                contact: { initialValue: 'phone' },
            };
            const form = useForm(model);
            return (
                <>
                    <label htmlFor="phone">
                        Phone
                        <input
                            {...form.bind('contact')}
                            type="radio"
                            name="contact"
                            id="phone"
                            defaultValue="phone"
                        />
                    </label>
                    <br />
                    <label htmlFor="fax">
                        Fax
                        <input
                            {...form.bind('contact')}
                            type="radio"
                            name="contact"
                            id="fax"
                            defaultValue="fax"
                        />
                    </label>
                    <br />
                    <label htmlFor="email">
                        Email
                        <input
                            {...form.bind('contact')}
                            type="radio"
                            name="contact"
                            id="email"
                            defaultValue="email"
                        />
                    </label>
                </>
            );
        };

        render(<Comp />);

        const phoneRadioInput = screen.getByRole('radio', { name: /phone/i });

        expect(phoneRadioInput).toBeChecked();
    });

    test('should set form.control.isTouched to true on blur event', () => {
        const formModel: FormModel = {
            contact: 'phone',
        };
        const hook = renderHook(() => useForm(formModel));
        const { bind, controls } = hook.result.current;

        act(() => {
            const onBlueEvent = (): boolean => true;
            bind('contact').onBlur(onBlueEvent as unknown as FormChangeEvent);
        });

        expect(controls.contact.isTouched).toBe(true);
    });

    test('should set form.control.isDirty to true on input change event', () => {
        const formModel: FormModel = {
            contact: 'phone',
        };
        const hook = renderHook(() => useForm(formModel));
        const { bind, controls } = hook.result.current;

        act(() => {
            const change = {
                target: { value: 'newValue' },
            } as ChangeEvent<HTMLInputElement>;
            bind('contact').onChange(change);
        });

        expect(controls.contact.isDirty).toBe(true);
    });

    test.skip('should set "controls.name.value" and "selected radio" to given value on "controls.name.setValue(value)"', async () => {
        const Comp = (): JSX.Element => {
            const model: FormModel = {
                contact: { initialValue: 'phone' },
            };
            const form = useForm(model);
            return (
                <>
                    <label htmlFor="phone">
                        Phone
                        <input
                            {...form.bind('contact')}
                            type="radio"
                            name="contact"
                            id="phone"
                            defaultValue="phone"
                        />
                    </label>
                    <br />
                    <label htmlFor="fax">
                        Fax
                        <input
                            {...form.bind('contact')}
                            type="radio"
                            name="contact"
                            id="fax"
                            defaultValue="fax"
                        />
                    </label>
                    <br />
                    <label htmlFor="email">
                        Email
                        <input
                            {...form.bind('contact')}
                            type="radio"
                            name="contact"
                            id="email"
                            defaultValue="email"
                        />
                    </label>
                    <button onClick={() => form.controls.contact.setValue('fax')}>
                        change to fax
                    </button>
                </>
            );
        };

        render(<Comp />);

        const button = screen.getByRole('button');
        const faxRadioInput = screen.getByRole('radio', { name: /fax/i });

        await userEvent.click(button);

        expect(faxRadioInput).toBeChecked();
    });
});

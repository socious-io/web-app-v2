import { ChangeEvent } from 'react';

export const generateChangeEvent = (value: string): ChangeEvent<HTMLInputElement> => {
    return { target: { value } } as ChangeEvent<HTMLInputElement>;
};

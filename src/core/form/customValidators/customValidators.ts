import { REGEX } from '../../../constants/REGEX';

export const email = () => ({
    name: 'email',
    message: 'incorrect email',
    validateWith: (value: string) => REGEX.email.test(value),
});

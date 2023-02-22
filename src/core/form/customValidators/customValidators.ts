import { REGEX } from '../../../constants/REGEX';

export const email = () => ({
    name: 'email',
    message: 'wrong username patter',
    validateWith: (value: string) => REGEX.email.test(value),
});

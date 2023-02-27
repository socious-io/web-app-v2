import { REGEX } from '../../../constants/REGEX';
import { minLength, required } from '../useForm/validations';

export const email = () => ({
    name: 'email',
    message: 'incorrect email',
    validateWith: (value: string) => REGEX.email.test(value),
});

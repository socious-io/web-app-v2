import { FormModel } from 'src/core/form/useForm/useForm.types';
import { number } from 'src/core/form/customValidators/customValidators';
import { max, min, minLength, required } from 'src/core/form';
import { CardItems } from 'src/core/types';

export const formModel = {
  cardholderName: {
    initialValue: '',
    validators: [required()],
  },
  cardNumber: {
    initialValue: '',
    validators: [required(), number(), minLength(8, 'Card number must has minimum 8 characters')],
  },
  year: {
    initialValue: new Date().getFullYear().toString().slice(-2),
    validators: [required(), number(), min(23, 'The expiration year is not valid')],
  },
  month: {
    initialValue: new Date().getMonth() + 1,
    validators: [required(), number(), max(12, 'The expiration month is not valid')],
  },
  cvc: {
    initialValue: '',
    validators: [required(), number(), minLength(3, 'CVC must has minimum 3 characters')],
  },
};

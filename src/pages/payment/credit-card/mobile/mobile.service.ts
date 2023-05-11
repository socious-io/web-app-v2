import { FormModel } from 'src/core/form/useForm/useForm.types';
import { number } from 'src/core/form/customValidators/customValidators';
import { max, min, minLength, required } from 'src/core/form';
import { CardItems } from 'src/core/types';

export const formModel = (intialValues: CardItems): FormModel => {
  const { cvc, exp_month, exp_year, holder_name, numbers } = intialValues || {};
  const exp_month_format = exp_month < 10 ? '0' + exp_month : exp_month;
  const exp_year_format = exp_year?.toString().slice(-2);

  return {
    cardholderName: {
      initialValue: holder_name || '',
      validators: [required()],
    },
    cardNumber: {
      initialValue: numbers ? '**** ' + numbers : '',
      validators: [required(), number(), minLength(8, 'Card number must has minimum 8 characters')],
    },
    year: {
      initialValue: exp_year_format,
      validators: [required(), number(), min(23, 'The expiration year is not valid')],
    },
    month: {
      initialValue: exp_month_format,
      validators: [
        required(),
        number(),
        max(12, 'The expiration month is not valid'),
      ],
    },
    cvc: {
      initialValue: cvc || '',
      validators: [required(), number(), minLength(3, 'CVC must has minimum 3 characters')],
    },
  };
};

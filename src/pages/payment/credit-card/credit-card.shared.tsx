import { useForm } from 'src/core/form';
import { formModel } from './credit-card.service';

export const useCreditCardShared = () => {
  const form = useForm(formModel);
  const formIsInvalid = !form.isValid;
  const controlErrors = { ...form.controls.year?.errors, ...form.controls.month?.errors } || {};
  const isDirtyYearOrMonth = form.controls.year.isDirty || form.controls.month.isDirty;
  const errors = Object.values(controlErrors) as string[];

  return {
    form,
    formIsInvalid,
    isDirtyYearOrMonth,
    errors,
  };
};

import { DispatchWithoutAction, useReducer, useRef } from 'react';
import { FormGroup, FormBehaviors, FormOutput } from '../core/form';

const generateField = (fieldValue: FormBehaviors, rerender: DispatchWithoutAction): FormOutput => {
  const obj = {
    validations: fieldValue.validations,
    value: fieldValue.value,
    required: fieldValue.required,
    isValid: true,
    errors: [],
  };

  const validateField = (v: string): string[] => {
    if (!obj.validations.length) {
      return [];
    }
    return obj.validations
      .map((item) => {
        const regex = new RegExp(item.validation);
        const isValid = regex.test(v);
        if (!isValid) {
          return item.errorMsg;
        }
      })
      .filter((item) => item) as string[];
  };

  const update = (v: string) => {
    obj.value = v;
    obj.errors = validateField(v);
    obj.isValid = obj.errors.length > 0 ? false : true;
    obj.isValid = false;
    rerender();
  };

  update.bind(obj);
  obj.update = update;
  return obj;
};

const createForm = (
  form: FormGroup,
  rerender: DispatchWithoutAction
): Record<string, FormOutput> => {
  const obj = {} as Record<string, FormOutput>;
  Object.entries(form).forEach(([fieldName, values]) => {
    obj[fieldName] = generateField(values, rerender);
  });
  return obj;
};

export const useForm = (form: FormGroup) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const ref = useRef(createForm(form, forceUpdate));
  return ref.current;
};

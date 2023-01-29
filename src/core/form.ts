type FormBehaviors = {
  validations: {
    validation: string;
    errorMsg: string;
  }[];
  value: string;
  required: boolean;
};

type FormOutput = {
  validations: FormBehaviors['validations'];
  value: string;
  required: boolean;
  isValid: boolean;
  update: (v: string) => void;
};

type Form = Record<string, FormBehaviors>;

const generateField = (fieldValue: FormBehaviors): FormOutput => {
  return {
    validations: fieldValue.validations,
    value: fieldValue.value,
    required: fieldValue.required,
    isValid: false,
    update: function (v: string) {
      this.value = v;
    },
  };
};

export const createForm = (form: Form): Record<string, FormOutput> => {
  const obj = {} as Record<string, FormOutput>;
  Object.entries(form).forEach(([fieldName, values]) => {
    obj[fieldName] = generateField(values);
  });
  return obj;
};

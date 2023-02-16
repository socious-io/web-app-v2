export type FormBehaviors = {
  validations: {
    validation: string;
    errorMsg: string;
  }[];
  value: string;
  required: boolean;
};

export type FormOutput = {
  validations: FormBehaviors['validations'];
  value: string;
  required: boolean;
  isValid: boolean;
  errors: string[];
  update: (v: string) => void;
};

export type FormModel = Record<string, FormBehaviors>;
export type FormGroup = {
  [key in T]: FormOutput;
  // Record<string, FormOutput>
};

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

export const createForm = (form: FormModel): Record<string, FormOutput> => {
  const obj = {} as Record<string, FormOutput>;
  Object.entries(form).forEach(([fieldName, values]) => {
    obj[fieldName] = generateField(values);
  });
  return obj;
};

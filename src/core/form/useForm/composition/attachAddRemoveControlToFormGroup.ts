/* eslint-disable no-param-reassign */
import { FormGroup, GenerateFormGroup } from '../useForm.types';

export const attachAddRemoveControlToFormGroup =
    (setRefValue: GenerateFormGroup) =>
    (formGroup: Required<FormGroup>): Required<FormGroup> => {
        formGroup.add = (model) => {
            // TODO: guard against existing controls
            setRefValue(model);
        };
        formGroup.remove = (controlName: string | string[]) => {
            const isTypeOfArray = Array.isArray(controlName);
            if (isTypeOfArray) {
                controlName.forEach((name) => delete formGroup.controls[name]);
            } else {
                delete formGroup.controls[controlName];
            }
        };
        return formGroup;
    };

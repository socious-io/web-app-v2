import {required} from "../../core/form";
import {FormModel} from "../../core/form/useForm/useForm.types";

export const formModel: FormModel = {
    submit_hours: {
        initialValue: '',
        validators: [required()],
    },
};

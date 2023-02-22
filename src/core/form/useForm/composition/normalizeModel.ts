import { FormModel, NormalizedModel } from '../useForm.types';

export const normalizeModel = (model: FormModel): NormalizedModel => {
    const requiredValues = {
        disabled: false,
        adapter: undefined,
        validators: [],
    };

    return Object.entries(model).reduce((prev, [key, value]) => {
        if (typeof value !== 'object') {
            return {
                ...prev,
                [key]: { ...requiredValues, initialValue: value },
            };
        }
        return {
            ...prev,
            [key]: { ...requiredValues, ...value },
        };
    }, {});
};

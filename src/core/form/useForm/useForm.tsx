import { compose } from 'ramda';
import { useEffect, useId, useMemo, useRef } from 'react';
import { useForceUpdate } from '../useForceUpdate/UseForceUpdate';
import { attachAddRemoveControlToFormGroup } from './composition/attachAddRemoveControlToFormGroup';
import { attachBindToFormGroup } from './composition/attachBindToFormGroup';
import { attachControlsToFormGroup } from './composition/attachControlsToFormGroup';
import { normalizeModel } from './composition/normalizeModel';
import { setRadioInitialCheckedState } from './useForm.helper';
import {
    AddToRef,
    ControlRefs,
    FormGroup,
    FormModel,
    GenerateFormGroup,
    SetRefValue,
} from './useForm.types';

export const useForm = (model: FormModel, name?: string): Required<FormGroup> => {
    const refs = useRef<ControlRefs>({});
    const rerender = useForceUpdate();
    const id = useId();
    const nameId = name || id;

    const addToRefs: AddToRef = (controlName, ref) => {
        const key = ref.type === 'radio' ? `${controlName}#${ref.value}` : controlName;
        const refExists = refs.current[controlName];

        if (refExists) {
            return;
        }
        if (!refs.current[controlName]?.ref) {
            const obj = {
                ref,
                initializeValueSet: false,
            };
            refs.current[key] = obj;
        } else {
            refs.current[key].ref = ref;
        }
    };

    const setRefValue: SetRefValue = (controlName, value, type) => {
        if (type === 'radio') {
            const key = `${controlName}#${value}`;
            refs.current[key].ref.checked = true;
            refs.current[key].ref.value = JSON.stringify(value);
        } else if (refs.current[controlName]?.ref) {
            // @ts-ignore
            refs.current[controlName].ref.value = value;
        }
    };

    const formGroup = useMemo<Required<FormGroup>>(() => {
        const convertModelToControl: GenerateFormGroup = compose(
            attachBindToFormGroup(addToRefs, rerender),
            attachControlsToFormGroup(setRefValue, rerender, nameId),
            normalizeModel
        );
        const formGroupWithControls = convertModelToControl(model);
        const formGroupWIthAddRemove =
            attachAddRemoveControlToFormGroup(convertModelToControl);
        return formGroupWIthAddRemove(formGroupWithControls);
    }, [model, rerender]);

    useEffect(() => {
        setRadioInitialCheckedState(formGroup.controls, refs);
    }, [formGroup.controls]);

    return formGroup;
};

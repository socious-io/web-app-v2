import { generateControlErrorsProp } from '../useForm.helper';
import {
    NormalizedModel,
    FormGroup,
    Control,
    SetRefValue,
    ControlPrimitiveValue,
} from '../useForm.types';
import {
    generateControlIsValidProp,
    generateFormGroupIsValidProp,
} from '../useForm.validations';

const formGroupBluePrint: FormGroup = {
    controls: {},
    bind: undefined,
    isValid: false,
    isTouched: false,
    isDirty: false,
    add: undefined,
    remove: undefined,
    reset: undefined,
};

const base: Record<string, FormGroup> = {};

export const attachControlsToFormGroup =
    (setRefValue: SetRefValue, rerender: () => void, name: string) =>
    (model: NormalizedModel): FormGroup => {
        base[name] = { ...formGroupBluePrint };
        const baseFormGroup = base[name];
        const controls = Object.entries(model).reduce((prev, [controlName, value]) => {
            const { initialValue, validators, disabled } = value;

            const control: Control = {
                value: initialValue,
                isTouched: false,
                isDirty: false,
                isValid: generateControlIsValidProp(initialValue, validators),
                errors: generateControlErrorsProp(initialValue, validators),
                isDisabled: disabled,
                disable() {
                    this.isDisabled = true;
                    rerender();
                },
                enable() {
                    this.isDisabled = false;
                    rerender();
                },
                setValue(v) {
                    // @ts-ignore
                    setRefValue(controlName, v, this.type);
                    this.value = v;
                    this.isDirty = true;
                    formGroup.isDirty = true;
                    this.errors= generateControlErrorsProp(v, validators),
                    this.isValid= generateControlIsValidProp(initialValue, validators),
                    this._subscribeCallbacks.forEach((cb) => cb(this.value));
                    rerender();
                },
                reset() {
                    const controlModel: NormalizedModel = {
                        [controlName]: model[controlName],
                    };
                    const newControl = attachControlsToFormGroup(
                        setRefValue,
                        rerender,
                        name
                    )(controlModel).controls[controlName];
                    baseFormGroup.controls[controlName] = newControl;
                    // @ts-ignore
                    setRefValue(controlName, model[controlName].initialValue, this.type);
                    rerender();
                },
                subscribe(cb) {
                    const callbackExist = (
                        callback: (value: ControlPrimitiveValue) => void
                    ): boolean => {
                        const cbString = callback.toString();
                        return this._subscribeCallbacks
                            .map(toString)
                            .some((item) => item !== cbString);
                    };

                    if (this._subscribeCallbacks.length === 0) {
                        this._subscribeCallbacks.push(cb);
                    } else if (!callbackExist(cb)) {
                        this._subscribeCallbacks.push(cb);
                    }
                },
                addValidator(validator) {
                    if (Array.isArray(validator)) {
                        this._validators.push(...validator);
                    } else {
                        this._validators.push(validator);
                    }
                    this.isValid = generateControlIsValidProp(
                        this.value,
                        this._validators
                    );
                    this.errors = generateControlErrorsProp(this.value, this._validators);
                    baseFormGroup.isValid = generateFormGroupIsValidProp(
                        baseFormGroup.controls
                    );
                    rerender();
                },
                removeValidator(validatorName) {
                    if (Array.isArray(validatorName)) {
                        this._validators = this._validators.filter(
                            (validator) => !validatorName.includes(validator.name)
                        );
                    } else {
                        this._validators = this._validators.filter(
                            (validator) => validator.name !== validatorName
                        );
                    }
                    this.isValid = generateControlIsValidProp(
                        this.value,
                        this._validators
                    );
                    baseFormGroup.isValid = generateFormGroupIsValidProp(
                        baseFormGroup.controls
                    );
                    rerender();
                },
                _subscribeCallbacks: [],
                _validators: [...validators],
            };
            return { ...prev, [controlName]: control };
        }, {});

        baseFormGroup.controls = { ...baseFormGroup.controls, ...controls };
        baseFormGroup.isValid = generateFormGroupIsValidProp(baseFormGroup.controls);
        baseFormGroup.reset = () => {
            Object.entries(baseFormGroup.controls).forEach(([, value]) => {
                value.reset();
            });
            baseFormGroup.isDirty = false;
            baseFormGroup.isTouched = false;
        };
        const formGroup = baseFormGroup;
        return formGroup;
    };

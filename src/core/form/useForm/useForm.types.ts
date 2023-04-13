import { ChangeEvent, HTMLAttributes, HTMLInputTypeAttribute } from 'react';

export type DefaultValue = HTMLAttributes<HTMLInputElement>['defaultValue'];
export type DefaultChecked = HTMLAttributes<HTMLInputElement>['defaultChecked'];
export type ControlPrimitiveValue = DefaultValue | boolean | File;

type ValidatorName = 'min' | 'max' | 'minLength' | 'maxLength' | 'required' | string;

export type Validator = {
    name: ValidatorName;
    validateWith: (value: ControlPrimitiveValue) => boolean;
    message?: string;
};

export type ControlObjectModel = {
    initialValue: ControlPrimitiveValue;
    validators?: Validator[];
    disabled?: boolean | string | string[];
    adapter?: unknown;
};

export type FormModel = Record<string, ControlObjectModel | ControlPrimitiveValue>;
export type NormalizedModel = Record<string, Required<ControlObjectModel>>;

export type ControlError = {
    [key in ValidatorName]: Validator['message'];
};

export type Adapter = {
    setValue: (e: unknown) => void;
    setAsTouched: () => void;
    disabled: boolean;
    isValid: boolean;
    errors: ControlError;
    initialValue: ControlPrimitiveValue;
};

export type GenerateControls = (model: FormModel) => {
    controls: Controls;
    normalizedModel: NormalizedModel;
};

export type FormChangeEvent =
    | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | string>
    | null
    | string;

export type JSXBinding = {
    defaultValue?: DefaultValue;
    defaultChecked?: DefaultChecked;
    onChange: (ev: FormChangeEvent) => void;
    onBlur: (ev: FormChangeEvent) => void;
    ref: (ref: HTMLInputElement) => void;
    disabled: boolean;
    // use infer in ref
};

export type OnControlValueChange = ReturnType<GenerateBinding>['onControlValueChange'];
export type OnControlBlur = ReturnType<GenerateBinding>['onControlBlurEvent'];

export type Bind = (controlName: string) => JSXBinding;

export type GenerateBinding = (
    model: NormalizedModel,
    controls: Controls
) => {
    bind: Bind;
    onControlValueChange: (fn: ChangeObserver) => void;
    onControlBlurEvent: (fn: BlurObserver) => void;
};

export type ChangeObserver = (ev: {
    controlName: string;
    value: ControlPrimitiveValue;
}) => unknown;

export type BlurObserver = (ev: { controlName: string }) => unknown;

export type ControlConvertor = (control: Required<ControlObjectModel>) => Control;

export type Controls = {
    [key: string]: Control;
};

export type Control = {
    // rawValue: ControlPrimitiveValue;
    value: ControlPrimitiveValue;
    type?: HTMLInputTypeAttribute;
    isValid: boolean;
    errors: ControlError;
    isTouched: boolean; // becomes true on blur event
    isDirty: boolean; // becomes true on change event
    disable: () => void;
    enable: () => void;
    isDisabled: ControlObjectModel['disabled'];
    setValue: (value: ControlPrimitiveValue) => void;
    subscribe: (cb: (value: ControlPrimitiveValue) => void) => void;
    addValidator: (validator: Validator | Validator[]) => void;
    removeValidator: (name: Validator['name'] | Validator['name'][]) => void;
    reset: () => void;
    _subscribeCallbacks: Array<(value: ControlPrimitiveValue) => void>;
    _validators: Validator[];
};

export type FormGroup = {
    controls: Controls;
    bind?: Bind;
    isValid: boolean;
    isTouched: boolean;
    isDirty: boolean;
    reset?: () => void;
    add?: (control: FormModel) => void;
    remove?: (controlName: string | string[]) => void;
};

export type AddToRef = (controlName: string, ref: HTMLInputElement) => void;
export type SetRefValue = (
    controlName: string,
    value: ControlPrimitiveValue,
    type: HTMLInputTypeAttribute
) => void;

export type GenerateFormGroup = (model: FormModel) => Required<FormGroup>;

export type ControlRefs = {
    [key: string]: {
        ref: HTMLInputElement;
        initializeValueSet: boolean;
    };
};

export type FilterNonInitialized = (
    param: [string, { ref: HTMLInputElement; initializeValueSet: boolean }]
) => boolean;

export type SetDefaultValue = (
    param: [string, { ref: HTMLInputElement; initializeValueSet: boolean }]
) => void;

export type FilterByTypeRadio = (
    param: [string, { ref: HTMLInputElement; initializeValueSet: boolean }]
) => boolean;

export type SetAsInitialized = (
    param: [string, { ref: HTMLInputElement; initializeValueSet: boolean }]
) => [string, { ref: HTMLInputElement; initializeValueSet: boolean }];

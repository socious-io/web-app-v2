/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getValueBasedOnType, generateJSXValueAttribute } from './useForm.helper';
import { GenerateNativeBinding, JSXBinding } from './useForm.types';

export const generateNativeBinding: GenerateNativeBinding = (
    onChangeObservers,
    onBlurObservers,
    controlModel,
    controlName,
    controls
) => {
    const jsx: JSXBinding = {
        onChange: (e) => {
            // why? native inputs send "object" as e, custom inputs send "primitives"
            // @ts-ignore
            const value = typeof e === 'object' ? getValueBasedOnType(e) : e;
            const arg = { controlName, value };
            onChangeObservers[0](arg);
        },
        onBlur: (e) => {
            const arg = { controlName, value: e };
            onBlurObservers[0](arg);
        },
        // @ts-ignore
        disabled: controls[controlName].isDisabled,
    };
    const JSXValueAttribute = generateJSXValueAttribute(
        controlModel.initialValue,
        controlModel
    );

    Object.assign(jsx, JSXValueAttribute);
    return jsx;
};

/* eslint-disable no-console */

import { DefaultValue } from './useForm.types';

export type Adapter = {
    initialValue: DefaultValue;
    setValue: (value: unknown) => void;
    setDisableState?: unknown;
};

export const nativeAdapter = (props: Adapter): void => {
    console.log('props:', props);
};

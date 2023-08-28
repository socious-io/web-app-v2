export function when<T, P>(value: unknown, fn: (params?: P) => T, params?: P) {
  if (value) {
    return fn(params);
  }
}

export function printWhen(content: unknown, conditions: boolean | undefined | null): JSX.Element {
  return conditions ? <>{content}</> : <></>;
}

export const debounce = (func: Function, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export const removedEmptyProps = (obj: Record<string | number, unknown>) =>
  Object.entries(obj).reduce((prev, [key, value]) => {
    if (value) {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});

export const removeEmptyArrays = (obj: null | undefined | Record<string | number, unknown>) => {
  if (!obj) {
    return;
  }

  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (Array.isArray(value) && value.length === 0) {
    } else {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});
};

export const removeValuesFromObject = (obj: any, valuesToRemove: Array<string | null | undefined | number>) => {
  for (const key in obj) {
    if (valuesToRemove.includes(obj[key])) {
      delete obj[key];
    }
  }
  return obj;
};

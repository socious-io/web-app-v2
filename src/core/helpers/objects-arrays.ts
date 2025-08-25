export const removedEmptyProps = (obj: Record<string | number, unknown> | unknown) => {
  if (!obj) return obj;
  if (obj instanceof FormData) return obj;
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (value) {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});
};

export const removeEmptyArrays = (obj: null | undefined | Record<string | number, unknown>) => {
  if (!obj) {
    return;
  }

  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (!Array.isArray(value) || !(value.length === 0)) Object.assign(prev, { [key]: value });

    return prev;
  }, {});
};

export const removeValuesFromObject = (obj: any, valuesToRemove: Array<string | null | undefined | number>) => {
  const output: any = {};
  for (const key in obj) {
    if (!valuesToRemove.includes(obj[key])) {
      output[key] = obj[key];
    }
  }
  return output;
};

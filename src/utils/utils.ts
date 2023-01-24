export function when<T, P>(value: boolean, fn: (params?: P) => T, params?: P) {
  if (value) {
    return fn(params);
  }
}

export const debounce = (func: Function, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

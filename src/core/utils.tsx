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

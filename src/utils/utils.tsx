export function when<T, P>(value: boolean, fn: (params?: P) => T, params?: P) {
  if (value) {
    return fn(params);
  }
}

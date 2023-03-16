export function convertSnakeCaseToLowerCase(value: string): string {
  try {
    return value.toLowerCase()?.replaceAll('_', ' ');
  } catch {
    console.warn('value could not be transform to lowercase');
    return '';
  }
}

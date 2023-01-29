export function convertSnakeCaseToLowerCase(value: string): string {
  try {
    return value.toLowerCase()?.replaceAll('_', ' ');
  } catch {
    console.error('value could not be transform to lowercase');
    return '';
  }
}

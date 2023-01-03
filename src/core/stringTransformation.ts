export function convertSnakeCaseToLowerCase(value: string): string {
  return value.toLowerCase()?.replaceAll('_', ' ');
}

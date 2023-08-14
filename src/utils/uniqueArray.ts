export function uniqueArray<T>(array: T[]) {
  return Array.from(new Set(array));
}

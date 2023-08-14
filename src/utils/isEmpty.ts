export function isEmpty<T>(value: T): boolean {
  if (typeof value === "number" || typeof value === "string") {
    return value === null || value === undefined || value === "";
  }

  if (Array.isArray(value) || typeof value === "object") {
    return Object.keys(value as {}).length === 0;
  }

  return false;
}

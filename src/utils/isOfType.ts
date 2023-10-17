type PossibleTypes =
  | "array"
  | "number"
  | "boolean"
  | "string"
  | "object"
  | "undefined"
  | "null"
  | "function"
  | "symbol"
  | "date"
  | "regexp"
  | "error"
  | "map"
  | "set"
  | "promise"
  | "int8array";

const typeChecks: Record<PossibleTypes, (value: any) => boolean> = {
  array: (value) => Array.isArray(value),
  number: (value) => typeof value === "number",
  boolean: (value) => typeof value === "boolean",
  string: (value) => typeof value === "string",
  object: (value) =>
    typeof value === "object" && !Array.isArray(value) && value !== null,
  undefined: (value) => value === undefined,
  null: (value) => value === null,
  function: (value) => typeof value === "function",
  symbol: (value) => typeof value === "symbol",
  date: (value) => value instanceof Date,
  regexp: (value) => value instanceof RegExp,
  error: (value) => value instanceof Error,
  map: (value) => value instanceof Map,
  set: (value) => value instanceof Set,
  promise: (value) => value instanceof Promise,
  int8array: (value) => value instanceof Int8Array,
};

/**
 * Checks if a value is of a specific type.
 * @param {any} value - The value to be checked.
 * @param {PossibleTypes} type - The type to check against.
 * @returns {boolean} Returns true if the value matches the specified type, otherwise false.
 * @throws {Error} Throws an error if an invalid type is provided.
 */
function isOfType(value: any, type: PossibleTypes): boolean {
  const typeCheckFn = typeChecks[type];
  if (typeCheckFn) {
    return typeCheckFn(value);
  } else {
    throw new Error("Invalid type");
  }
}

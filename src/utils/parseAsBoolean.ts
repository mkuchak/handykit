export function parseAsBoolean(value: any): boolean | undefined {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const lowercaseValue = value.toLowerCase();
    const trueValues = ["enabled", "active", "on", "yes", "1", "true"];
    const falseValues = ["disabled", "inactive", "off", "no", "0", "false"];

    if (trueValues.includes(lowercaseValue)) {
      return true;
    }

    if (falseValues.includes(lowercaseValue)) {
      return false;
    }
  }

  return undefined;
}

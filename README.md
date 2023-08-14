# HandyKit

HandyKit is a versatile utility library designed to streamline your JavaScript projects by providing a comprehensive set of helpful functions. From random number generation to type checking, string formatting, array manipulation, and more, HandyKit simplifies common coding tasks, saving you time and effort. Whether you're a seasoned developer or just starting out, HandyKit's well-crafted functions offer an intuitive and efficient way to enhance your JavaScript codebase with essential utilities.

## Helper Functions

### `sleep(ms: number): Promise<void>`

Sleeps the execution of code for the specified time in milliseconds

### `isOfType(value: any, type: string): boolean`

Checks if the given value is of the specified type.

### `path(filePath: string, path: string): string`

Returns the path of a file relative to the specified path.

### `parseAsBoolean(value: string | boolean): boolean`

Parses a value as a boolean. Accepts string representations like "true" or "false".

### `random(min: number, max: number): number`

Generates a random integer between the specified minimum and maximum values.

### `removeArrayElement<T>(array: T[], element: T): void`

Removes a specified element from an array, if it exists.

### `isObject(value: any): boolean`

Checks if a value is an object, excluding arrays and null.

### `shuffleArray<T>(array: T[]): T[]`

Shuffles the elements of an array randomly.

### `isEmpty<T>(value: T): boolean`

Checks if a value is empty or undefined. Supports numbers, strings, arrays, and objects.

### `uniqueArray<T>(array: T[]): T[]`

Removes duplicate elements from an array.

### `settlePromises<T>(promises: Promise<T>[]): Promise<T[]>`

Resolves an array of promises in parallel and returns an array of results which includes the resolved result or undefined if the promise was rejected.

### `Hotp` Class

A class for generating and verifying HOTP (HMAC-based One-Time Password) codes.

**Constructor**

```typescript
new Hotp(secret: string, counter: number, options?: HotpOptions)
```

- `secret`: The secret key for generating HOTP codes.
- `counter`: The counter value for generating the HOTP code.
- `options`: An optional object specifying additional options for HOTP generation.

**HotpOptions** (all optional)

- `algorithm: "sha1" | "sha256" | "sha512"`: The hashing algorithm used.
- `alphabet: string`: The alphabet used for the password.
- `dashes: boolean | number`: If `true`, the password is dashed.
- `length: number`: The length of the password.

**Methods**

- `password: string`: Generates a HOTP password based on the provided secret and counter.
- `verify(password: string): boolean`: Verifies if the provided password matches the generated HOTP password.
- `increment(): void`: Increments the counter value.
- `static generate(secret: string, counter: number, options?: HotpOptions): string`: Generates a HOTP password statically.
- `static verify(secret: string, counter: number, password: string, options?: HotpOptions): boolean`: Verifies a HOTP password statically.

## Examples

For usage examples of these functions, refer to the `./src/examples.ts` file in the HandyKit library repository.

import { join } from "path";
import {
  Hotp,
  isEmpty,
  isObject,
  isOfType,
  parseAsBoolean,
  path,
  random,
  removeArrayElement,
  settlePromises,
  shuffleArray,
  sleep,
  uniqueArray,
} from "./index";

async function main() {
  // parseAsBoolean examples
  console.log("[parseAsBoolean examples]");
  console.log(parseAsBoolean(true)); // Output: true
  console.log(parseAsBoolean("true")); // Output: true
  console.log(parseAsBoolean("yes")); // Output: true
  console.log(parseAsBoolean("off")); // Output: false
  console.log(parseAsBoolean("random")); // Output: undefined

  // sleep example
  console.log("\n[sleep example]");
  console.log("Start");
  await sleep(1000);
  console.log("End");

  // random example
  console.log("\n[random example]");
  console.log(random(1, 10));

  // path example
  console.log("\n[path example]");
  console.log(join(__dirname, "..", "package.json")); // Common method
  console.log(path(__dirname, "../package.json")); // Custom method

  // removeArrayElement example
  console.log("\n[removeArrayElement example]");
  const array = [1, 2, 3, 4, 5];
  removeArrayElement<number>(array, 3);
  console.log(array); // Output: [1, 2, 4, 5]

  // isOfType examples
  console.log("\n[isOfType examples]");
  console.log(isOfType(1, "number")); // Output: true
  console.log(isOfType("1", "number")); // Output: false
  console.log(isOfType("1", "string")); // Output: true
  console.log(isOfType(1, "string")); // Output: false

  // isObject examples
  console.log("\n[isObject examples]");
  console.log(isObject({})); // Output: true
  console.log(isObject([])); // Output: false
  console.log(isObject(null)); // Output: false
  console.log(isObject(42)); // Output: false
  console.log(isObject("Hello")); // Output: false
  console.log(isObject(Symbol())); // Output: false
  console.log(isObject(function () {})); // Output: false
  console.log(isObject(undefined)); // Output: false

  // shuffle example
  console.log("\n[shuffle example]");
  console.log(shuffleArray([1, 2, 3, 4, 5])); // Output: [3, 2, 1, 5, 4] (random order)

  // isEmpty examples
  console.log("\n[isEmpty examples]");
  console.log(isEmpty<number>(0)); // false
  console.log(isEmpty<string>("")); // true
  console.log(isEmpty<object>({})); // true
  console.log(isEmpty<number[]>([1, 2, 3])); // false
  console.log(isEmpty<string[]>([])); // true
  console.log(isEmpty<object>({ key: "value" })); // false

  // uniqueArray example
  console.log("\n[uniqueArray example]");
  console.log(uniqueArray([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])); // Output: [1, 2, 3, 4, 5]

  // settlePromises example
  console.log("\n[settlePromises example]");
  const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.reject(3),
    Promise.resolve(4),
    Promise.reject(5),
  ];
  const [
    firstPromiseResult,
    secondPromiseResult,
    thirdPromiseResult,
    fourthPromiseResult,
    fifthPromiseResult,
  ] = await settlePromises(promises);
  console.log(firstPromiseResult); // Output: 1
  console.log(secondPromiseResult); // Output: 2
  console.log(thirdPromiseResult); // Output: undefined
  console.log(fourthPromiseResult); // Output: 4
  console.log(fifthPromiseResult); // Output: undefined

  // Hotp example
  console.log("\n[Hotp example]");
  const hotp = new Hotp("secret", 0, { length: 8, dashes: true });
  const input = "SZA3-1C4Z";
  console.log(hotp.password); // Output: SZA3-1C4Z
  console.log(hotp.verify(input)); // Output: true
  hotp.increment();
  // or
  // hotp.counter++;
  // hotp.counter = 1;
  console.log(hotp.password); // Output: 2TNI-0BA9
  console.log(hotp.verify(input)); // Output: false
}

main();

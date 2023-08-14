import crypto from "node:crypto";

export interface HotpOptions {
  /**
   * The hashing algorithm to use.
   */
  algorithm?: "sha1" | "sha256" | "sha512";
  /**
   * The alphabet to use for the password.
   */
  alphabet?: string;
  /**
   * If `true`, the password will be automatically dashed.
   * If a number is provided, the password will be dashed in groups of that size.
   */
  dashes?: boolean | number;
  /**
   * The length of the password.
   */
  length?: number;
}

export class Hotp {
  public algorithm: "sha1" | "sha256" | "sha512";
  public alphabet: string;
  public dashes: boolean | number;
  public length: number;

  constructor(
    public secret: string,
    public counter: number,
    options?: HotpOptions
  ) {
    this.algorithm = options?.algorithm || "sha1";
    this.alphabet = options?.alphabet || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.dashes = options?.dashes || false;
    this.length = options?.length || 6;
    if (options?.alphabet && this.dashes && options.alphabet.includes("-")) {
      throw new Error(
        "Invalid alphabet, dashes cannot be included as they are designated for use as separators"
      );
    }
  }

  public get password(): string {
    const length = this.length + 2;
    const hmac = crypto.createHmac("sha1", this.secret);
    const counterBuffer = Buffer.alloc(8);
    counterBuffer.writeBigInt64BE(BigInt(this.counter), 0);

    const hash = hmac.update(counterBuffer).digest();
    const offset = hash[hash.length - 1] & 0xf;
    const binaryCode =
      ((hash[offset] & 0x7f) << 24) |
      ((hash[offset + 1] & 0xff) << 16) |
      ((hash[offset + 2] & 0xff) << 8) |
      (hash[offset + 3] & 0xff);

    const numPossibilities = this.alphabet.length ** length;
    const otp = binaryCode % numPossibilities;
    const otpString = Array.from(
      { length },
      (_, i) => this.alphabet[(otp >> (i * 5)) % this.alphabet.length]
    ).join("");
    const password = otpString.slice(length - this.length);

    return this.dashes ? this.dashedPassword(password) : password;
  }

  private dashedPassword(password: string): string {
    if (typeof this.dashes === "number") {
      return this.insertDashInGroups(password, this.dashes);
    }
    if (password.length >= 6 && password.length % 5 === 0) {
      return this.insertDashInGroups(password, 5);
    }
    if (password.length >= 6 && password.length % 4 === 0) {
      return this.insertDashInGroups(password, 4);
    }
    if (password.length >= 6 && password.length % 3 === 0) {
      return this.insertDashInGroups(password, 3);
    }

    return password;
  }

  private insertDashInGroups(str: string, groupSize: number): string {
    const groups = [];
    for (let i = 0; i < str.length; i += groupSize) {
      groups.push(str.slice(i, i + groupSize));
    }
    return groups.join("-");
  }

  private removeDashes(password: string): string {
    return password.replace(/-/g, "");
  }

  public verify(password: string): boolean {
    if (this.dashes) {
      return this.removeDashes(this.password) === this.removeDashes(password);
    }
    return this.password === password;
  }

  public increment(): void {
    this.counter++;
  }

  public static generate(
    secret: string,
    counter: number,
    options?: HotpOptions
  ): string {
    return new Hotp(secret, counter, options).password;
  }

  public static verify(
    secret: string,
    counter: number,
    password: string,
    options?: HotpOptions
  ): boolean {
    return new Hotp(secret, counter, options).verify(password);
  }
}

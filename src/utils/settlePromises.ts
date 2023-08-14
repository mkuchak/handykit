export async function settlePromises<T extends readonly unknown[] | []>(
  promises: T
): Promise<{ -readonly [P in keyof T]: Awaited<T[P]> | undefined }> {
  const results = await Promise.allSettled(promises);
  return results.map((result: PromiseSettledResult<any>) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    return undefined;
  }) as { -readonly [P in keyof T]: Awaited<T[P]> | undefined };
}

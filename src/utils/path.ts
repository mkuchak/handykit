import { join } from "path";

export function path(filePath: string, path: string): string {
  return join(filePath, ...path.split("/"));
}

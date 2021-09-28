export function isVoid(params: unknown): params is boolean {
  return params === undefined || params === null || params === "";
}

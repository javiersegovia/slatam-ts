export function isArrayOfStrings(x: any[]) {
  return x.every((i) => typeof i === 'string')
}

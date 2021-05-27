/**
 * Make optional all the nested properties
 */
export type NestedPartial<T> = {
  [P in keyof T]?: NestedPartial<T[P]>
}
/**
 * Make optional all the nested properties, except the keys that you specify
 */
export type NestedPartialExcept<T, K extends keyof T> = NestedPartial<T> &
  Pick<T, K>

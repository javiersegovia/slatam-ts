/**
 * Capitalizes the first letter and let the others untouched
 */
export function capitalizeOnlyFirstLetter(string?: string) {
  if (!string) return

  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Capitalizes the first letter and make all others lowercase
 */
export function capitalizeFirstLetter(string?: string) {
  if (!string) return

  return capitalizeOnlyFirstLetter(string.toLowerCase())
}

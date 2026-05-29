/**
 * Generates a short, unique client-side ID.
 *
 * Uses an auto-incrementing counter combined with a base-36 random suffix
 * to produce compact, collision-resistant identifiers (e.g. `:r0:`, `:r1a:`)
 * similar in style to React's `useId`.
 *
 * @param prefix - Optional prefix for the ID. Defaults to `:r`.
 * @returns A short unique string ID.
 */

let counter = 0;

export function generateId(prefix = 'zg-'): string {
  const id = counter++;
  const random = Math.random().toString(36).slice(2, 5);
  return `${prefix}${id.toString(36)}${random}:`;
}

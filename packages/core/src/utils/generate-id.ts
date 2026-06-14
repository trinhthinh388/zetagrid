let idCounter = 0;

/**
 * Generates a unique, stable-like ID formatted similarly to React's `useId` (e.g., `:r0:`, `:r1:`).
 * This works by incrementing a global counter on each call.
 *
 * @returns A unique identifier string in the format `:r{number}:`.
 */
export const generateId = (): string => {
  return `_zg${idCounter++}`;
};

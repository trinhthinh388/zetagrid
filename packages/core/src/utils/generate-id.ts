/**
 * Generates a short, unique client-side ID.
 *
 * Uses an auto-incrementing counter combined with a base-36 random suffix
 * to produce compact, collision-resistant identifiers.
 */
let counter = 0;

function generateId(prefix: string): string {
  const id = counter++;
  const random = Math.random().toString(36).slice(2, 5);
  return `${prefix}${id.toString(36)}${random}:`;
}

/**
 * Centralized ID generator factory for all ZetaGrid entity types.
 *
 * Each method produces IDs with a consistent, type-specific prefix,
 * ensuring uniform naming conventions across the grid.
 *
 * @example
 * ```ts
 * idGenerator.headerGroup(); // 'hg-0a1b:'
 * idGenerator.header();      // 'hd-1c2d:'
 * idGenerator.placeholder(); // 'ph-2e3f:'
 * idGenerator.cell();        // 'cl-3g4h:'
 * idGenerator.row();         // 'rw-4i5j:'
 * idGenerator.column();      // 'co-5k6l:'
 * ```
 */
export const idGenerator = {
  /** Generates a header group ID (prefix: `hg-`). */
  headerGroup: () => generateId('hg-'),

  /** Generates a header ID (prefix: `hd-`). */
  header: () => generateId('hd-'),

  /** Generates a placeholder header ID (prefix: `ph-`). */
  placeholder: () => generateId('ph-'),

  /** Generates a cell ID (prefix: `cl-`). */
  cell: () => generateId('cl-'),

  /** Generates a row ID (prefix: `rw-`). */
  row: () => generateId('rw-'),

  /** Generates a column ID (prefix: `co-`). */
  column: () => generateId('co-'),
} as const;

import { RowData } from '../types';

/**
 * Minimal interface capturing what the registry needs from a grid.
 * Avoids importing `Grid` directly to prevent circular dependencies.
 */
export interface Registrable {
  getId: () => string;
}

/**
 * Global registry that holds references to all active Grid instances,
 * keyed by their unique ID.
 */
class GridRegistry {
  private static instance: GridRegistry;
  static getInstance = (): GridRegistry => {
    if (!GridRegistry.instance) {
      GridRegistry.instance = new GridRegistry();
    }
    return GridRegistry.instance;
  };

  private _grids: Map<string, Registrable>;

  private constructor() {
    this._grids = new Map();
  }

  /**
   * Clear all registered grids.
   */
  clear(): void {
    this._grids.clear();
  }

  /**
   * Check if a grid with the given ID exists in the registry.
   */
  has(id: string): boolean {
    return this._grids.has(id);
  }

  /**
   * Remove a grid from the registry by its ID.
   */
  unregister(id: string): boolean {
    return this._grids.delete(id);
  }

  /**
   * Retrieve a grid by its ID.
   */
  get<TData extends RowData>(id: string): Registrable | undefined {
    return this._grids.get(id);
  }

  /**
   * Register a registrable instance under its ID.
   */
  set(grid: Registrable): void {
    const id = grid.getId();
    if (this._grids.has(id)) {
      throw new Error(`Grid with ID "${id}" is already registered.`);
    }
    this._grids.set(id, grid);
  }

  /**
   * Returns the number of registered grids.
   */
  get size(): number {
    return this._grids.size;
  }
}

/**
 * The global grid registry singleton.
 */
export const gridRegistry = GridRegistry.getInstance();

export type { GridRegistry };

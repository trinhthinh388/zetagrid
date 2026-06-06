import { Grid } from '../grid/grid';
import { RowData } from '../types';

export class BaseGridPlugin<TData extends RowData = RowData> {
  grid: Grid<TData>;

  constructor({ grid }: { grid: Grid<TData> }) {
    this.grid = grid;
  }

  /**
   * Called when the grid initializes. Use this to set up any
   * listeners, observers, or internal state the plugin needs.
   */
  init = (): void => void 0;

  /**
   * Called when the grid is destroyed. Use this to clean up
   * listeners, observers, and release references.
   */
  destroy = (): void => void 0;
}

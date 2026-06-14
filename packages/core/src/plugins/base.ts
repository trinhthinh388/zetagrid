import { component } from '../common/annotations/component';
import { IGrid } from '../grid/types';
import { RowData } from '../types';

@component
export class BaseGridPlugin<TData extends RowData = RowData> {
  protected gridId: string;
  declare protected grid: IGrid<TData>;

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

  constructor({ gridId }: { gridId: string }) {
    this.gridId = gridId;
  }
}

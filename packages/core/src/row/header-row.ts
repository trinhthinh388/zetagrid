import { ColumnDefinition, RowData } from '../types';
import { Row } from './row';
import { RowType } from './types';
import { VirtualizedRow } from './virtualized-row';

export class HeaderRow<TData extends RowData = RowData> extends Row<TData> {
  maxDepth = 0;
  override type: RowType = 'header';
  virtulizedRows: VirtualizedRow<TData>[] = [];

  override init(): void {
    this.maxDepth = this.#getMaxColumnDefinitionDepth();
    this.virtulizedRows = Array.from({ length: this.maxDepth }).map(
      () =>
        new VirtualizedRow({
          grid: this.grid,
          columnDefinitions: this.columnDefinitions,
        }),
    );
  }

  #getMaxColumnDefinitionDepth(): number {
    const dfs = (columnDefinition?: ColumnDefinition<TData>): number => {
      if (!columnDefinition) return 0;
      return columnDefinition.children.reduce(
        (max, def: ColumnDefinition<TData> | undefined) => Math.max(max, dfs(def) + 1),
        1,
      );
    };
    return this.columnDefinitions.reduce((max, def) => Math.max(max, dfs(def)), 0);
  }
}

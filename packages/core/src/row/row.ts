import { Grid } from '../grid/grid';
import { RowData } from '../types';
import { ColumnDefinition } from '../types/columns';
import { generateId } from '../utils/generate-id';
import { IRow, RowType } from './types';

export type RowContructorParams<TData extends RowData = RowData> = {
  grid: Grid<TData>;
  columnDefinitions: ColumnDefinition<TData>[];
};

export abstract class Row<TData extends RowData = RowData> implements IRow<TData> {
  rowId: string;
  type: RowType;
  grid: Grid<TData>;
  columnDefinitions: ColumnDefinition<TData>[];

  constructor({ grid, columnDefinitions }: RowContructorParams<TData>) {
    this.rowId = `row:${generateId()}`;
    this.grid = grid;
    this.type = 'body';
    this.columnDefinitions = columnDefinitions;
  }

  init(): void {
    return void 0;
  }
}

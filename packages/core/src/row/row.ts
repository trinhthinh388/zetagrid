import { Cell } from '../cell/cell';
import { RowData } from '../types';
import { ColumnDefinition } from '../types/columns';
import { IRow, RowType } from './types';

export type RowContructorParams<TData extends RowData = RowData> = {
  columnDefinitions: ColumnDefinition<TData>[];
};

export abstract class Row<TData extends RowData = RowData> implements IRow<TData> {
  type: RowType;
  cells: Cell<TData>[];
  columnDefinitions: ColumnDefinition<TData>[];

  constructor({ columnDefinitions }: RowContructorParams<TData>) {
    this.cells = [];
    this.type = 'body';
    this.columnDefinitions = columnDefinitions;
  }

  init(): void {
    return void 0;
  }
}

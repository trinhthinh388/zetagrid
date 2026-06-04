import { RowData } from '../types';
import { ColumnDefinition } from '../types/columns';

export type GridConstructorParams<TData extends RowData = RowData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
};

export class Grid<TData extends RowData = RowData> {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];

  constructor({ data, columnDefinitions }: GridConstructorParams<TData>) {
    this.data = data;
    this.columnDefinitions = columnDefinitions;
  }
}

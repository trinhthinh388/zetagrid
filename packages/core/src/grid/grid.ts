import { HeaderRow } from '../row/header-row';
import { Row } from '../row/row';
import { RowData } from '../types';
import { ColumnDefinition } from '../types/columns';
import { IGrid } from './types';

export type GridConstructorParams<TData extends RowData = RowData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
};

export class Grid<TData extends RowData = RowData> implements IGrid<TData> {
  data: TData[];
  rows: Row<TData>[];
  root: HTMLElement | null;
  columnDefinitions: ColumnDefinition<TData>[];

  constructor({ data, columnDefinitions }: GridConstructorParams<TData>) {
    this.root = null;
    this.rows = [];
    this.data = data;
    this.columnDefinitions = columnDefinitions;
  }

  init(root: HTMLElement): void {
    this.root = root;
    this.rows = [new HeaderRow<TData>({ columnDefinitions: this.columnDefinitions })];
    this.rows.forEach((row) => row.init());
  }
}

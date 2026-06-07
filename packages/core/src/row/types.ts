import { Cell } from '../cell/cell';
import { RowData } from '../types';

export type RowType = 'header' | 'body' | 'footer';

export interface IRow<TData extends RowData = RowData> {
  getRowId: () => string;
  getCells: () => Cell<TData>[];
  insertCell: (cell: Cell<TData>) => void;
  getCellById: (cellId: string) => Cell<TData> | undefined;
}

export type RowState<TData extends RowData = RowData> = {
  init: boolean;
};

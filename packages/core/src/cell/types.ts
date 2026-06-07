import { RowData } from '../types';
import { Cell } from './cell';

export interface ICell<TData extends RowData = RowData> {
  getId: () => string;
  getColSpan: () => number;
  getRowSpan: () => number;
  getColIndex: () => number;
  getRowIndex: () => number;
  renderCell: <T = unknown>() => T;
}

export type CellRenderer<TData extends RowData = RowData> = (
  data: TData,
  cell: Cell<TData>,
) => unknown;

export type CellState<TData extends RowData = RowData> = {
  init: boolean;
};

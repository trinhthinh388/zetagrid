import { ComputedRect, RowData } from '../types';
import { Cell } from './cell';

export interface ICell<TData extends RowData = RowData> {
  render(): unknown;
  measure(): ComputedRect;
}

export type CellRenderer<TData extends RowData = RowData> = (
  data: TData,
  cell: Cell<TData>,
) => unknown;

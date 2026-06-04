import { RowData } from '../types';

export interface IGrid<TData extends RowData = RowData> {
  init(root: HTMLElement): void;
}

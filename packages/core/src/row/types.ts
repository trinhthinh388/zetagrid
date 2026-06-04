import { RowData } from '../types';

export type RowType = 'header' | 'body' | 'footer';

export interface IRow<TData extends RowData = RowData> {
  init(): void;
}

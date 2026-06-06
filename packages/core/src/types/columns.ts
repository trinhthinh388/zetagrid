import { RowData } from '.';
import { CellRenderer } from '../cell/types';

export type ColumnDefinition<TData extends RowData = RowData> = {
  id: string;
  title: unknown;
  cellRenderer: CellRenderer<TData>;
  children: ColumnDefinition<TData>[];
};

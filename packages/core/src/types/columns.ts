import { RowData } from '.';
import { CellRenderer } from '../cell/type';

export type ColumnDefinition<TData extends RowData = RowData> = {
  id: string;
  title: unknown;
  renderer: CellRenderer<TData>;
  children: ColumnDefinition<TData>[];
};

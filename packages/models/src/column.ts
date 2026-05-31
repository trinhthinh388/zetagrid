import { RowData } from './data';

export type ColumnAccessorFn<TData extends RowData> = (data: TData) => unknown;

export type ColumnDefinition<TData extends RowData> = {
  /**
   * The resolved unique identifier for the column.
   */
  id: string;
  /**
   * Title of the column.
   */
  title: string;
  /**
   * The resolved accessor to use when extracting data to render.
   */
  accessor: string | ColumnAccessorFn<TData>;
  children?: ColumnDefinition<TData>[];
  /**
   * Width of the column
   * @default 200
   */
  width: number;
};

export type ColumnAccessorFn<TData> = (data: TData) => unknown;

export type ColumnDefinition<TData> = {
  /**
   * The resolved unique identifier for the column.
   */
  id?: string;
  /**
   * Title of the column.
   */
  title: string;
  /**
   * The resolved accessor to use when extracting data to render.
   */
  accessor: string | ColumnAccessorFn<TData>;
};

import { ColumnDefinition, RowData } from '@models';

const getColumnDepth = <TData extends RowData>(column: ColumnDefinition<TData>): number => {
  if (!column.children || column.children.length === 0) return 1;
  return 1 + Math.max(...column.children.map(getColumnDepth));
};

export const getMaxColumnsDepth = <TData extends RowData>(columns: ColumnDefinition<TData>[]) => {
  if (columns.length === 0) return 0;
  return Math.max(...columns.map(getColumnDepth));
};

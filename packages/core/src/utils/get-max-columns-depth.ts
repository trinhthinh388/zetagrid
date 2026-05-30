import { ColumnDefinition } from '@models';

const getColumnDepth = <TData>(column: ColumnDefinition<TData>): number => {
  if (!column.children || column.children.length === 0) return 1;
  return 1 + Math.max(...column.children.map(getColumnDepth));
};

export const getMaxColumnsDepth = <TData>(columns: ColumnDefinition<TData>[]) => {
  if (columns.length === 0) return 0;
  return Math.max(...columns.map(getColumnDepth));
};

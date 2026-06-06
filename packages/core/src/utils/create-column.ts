import { ColumnDefinition, RowData } from '../types';
import { generateId } from './generate-id';

export const createColumn = <TData extends RowData = RowData>({
  title,
  children = [],
  id = generateId(),
  cellRenderer = () => null,
  ...others
}: Partial<ColumnDefinition<TData>>) => {
  return {
    ...others,
    id,
    title,
    children,
    cellRenderer,
  };
};

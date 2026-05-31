import { ColumnDefinition, RowData } from '@models';
import { idGenerator } from '../utils/generate-id';

export type CreateColumnArgs<TData extends RowData> = Partial<Omit<ColumnDefinition<TData>, 'title' | 'accessor'>> &
  Pick<ColumnDefinition<TData>, 'title' | 'accessor'>;

export const createColumn = <TData extends RowData>({
  id = idGenerator.column(),
  width = 200,
  ...args
}: CreateColumnArgs<TData>) => ({
  ...args,
  width,
  id,
});

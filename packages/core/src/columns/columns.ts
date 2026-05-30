import { ColumnDefinition } from '@models';
import { idGenerator } from '../utils/generate-id';

export type CreateColumnArgs<TData> = Partial<Omit<ColumnDefinition<TData>, 'title' | 'accessor'>> &
  Pick<ColumnDefinition<TData>, 'title' | 'accessor'>;

export const createColumn = <TData>({
  id = idGenerator.column(),
  width = 200,
  ...args
}: CreateColumnArgs<TData>) => ({
  ...args,
  width,
  id,
});

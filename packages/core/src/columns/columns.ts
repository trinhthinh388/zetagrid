import { ColumnDefinition } from '@models';
import { idGenerator } from '../utils/generate-id';

export type CreateColumnArgs<TData> = Partial<Omit<ColumnDefinition<TData>, 'title' | 'accessor'>> &
  Pick<ColumnDefinition<TData>, 'title' | 'accessor'>;

export const createColumn = <TData>({ id = idGenerator.column(), ...args }: CreateColumnArgs<TData>) => ({
  ...args,
  id,
});

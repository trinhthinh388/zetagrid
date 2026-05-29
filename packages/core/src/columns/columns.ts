import { ColumnDefinition } from '@models';
import { generateId } from '../utils/generate-id';

export type CreateColumnArgs<TData> = Partial<Omit<ColumnDefinition<TData>, 'title' | 'accessor'>> &
  Pick<ColumnDefinition<TData>, 'title' | 'accessor'>;

export const createColumn = <TData>({ id = generateId(), ...args }: CreateColumnArgs<TData>) => ({
  ...args,
  id,
});

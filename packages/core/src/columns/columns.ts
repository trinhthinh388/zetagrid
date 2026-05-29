import { ColumnDefinition } from '@models';

export type CreateColumnArgs<TData> = Partial<Omit<ColumnDefinition<TData>, 'title' | 'accessor'>> &
  Pick<ColumnDefinition<TData>, 'title' | 'accessor'>;

export const createColumn = <TData>(args: CreateColumnArgs<TData>) => ({ ...args });

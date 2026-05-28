import { ColumnDefinition } from '@models';

export const createColumn = <TData>(args: ColumnDefinition<TData>) => ({ ...args });

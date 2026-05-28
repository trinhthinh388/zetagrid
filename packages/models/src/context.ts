import { ColumnDefinition } from './column';

export type ZetaGridContext<TData> = {
  root?: HTMLElement;
  columnDefs: ColumnDefinition<TData>[];
};

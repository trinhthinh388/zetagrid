import { ColumnDefinition } from './column';
import { IGridModule } from './module';

export type ZetaGridContext<TData> = {
  root?: HTMLElement;
  columnDefs: ColumnDefinition<TData>[];
  modules: IGridModule[];
};

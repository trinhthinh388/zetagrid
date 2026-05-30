import { ColumnDefinition } from './column';
import { IGridModule } from './module';

export type ZetaGridContext<TData> = {
  columnDefs: ColumnDefinition<TData>[];
  modules: IGridModule<TData>[];
};

import { ColumnDefinition } from './column';
import { RowData } from './data';
import { IGridModule } from './module';

export type GridContext<TData extends RowData> = {
  columnDefs: ColumnDefinition<TData>[];
  modules: IGridModule<TData>[];
};

import { ColumnDefinition } from './column';
import { IGridModule } from './module';

export type ZetaGridContext<TData> = {
  root: HTMLElement | null;
  columnDefs: ColumnDefinition<TData>[];
  modules: IGridModule<TData>[];
  /**
   * Grid's width - in `px`
   * @default 500
   */
  width: number;
  /**
   * Grid's height - in `px`
   * @default 500
   */
  height: number;
};

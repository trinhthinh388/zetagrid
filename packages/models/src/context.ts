import { ColumnDefinition } from './column';
import { IGridModule } from './module';
import { IGridRenderer } from './renderer';

export type ZetaGridContext<TData> = {
  root?: HTMLElement;
  columnDefs: ColumnDefinition<TData>[];
  modules: IGridModule[];
  renderer: IGridRenderer<TData>;
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

import { Body } from '../body/body';
import { Cell } from '../cell/cell';
import { Header } from '../header/header';
import { BaseGridPlugin } from '../plugins/base';
import { ColumnDefinition, ComputedRect, RowData } from '../types';

export interface IGrid<TData extends RowData = RowData> {
  /**
   * Returns the ID of the grid.
   */
  getId: () => string;
  /**
   * Returns the current data of the Grid
   */
  getData: () => TData[];
  /**
   * Get the Grid's Body instance
   */
  getBody: () => Body<TData>;
  /**
   * Returns the computed rect of the grid DOM element.
   */
  getRect: () => ComputedRect;
  /**
   * Get the Grid's Header instance
   */
  getHeader: () => Header<TData>;
  getCellById: (cellId: string) => Cell<TData>;
  getColumnDefinitions: () => ColumnDefinition<TData>[];
  register: (...PluginClasses: (typeof BaseGridPlugin<TData>)[]) => void;
  /**
   * Retrieve a registered plugin by its class.
   * Throws if not found.
   */
  getPlugin: <TPlugin extends typeof BaseGridPlugin<TData>>(
    pluginClass: TPlugin,
  ) => InstanceType<TPlugin>;
}

export type GridObservers = {
  resize: ResizeObserver;
};

export type GridState = {
  init: boolean;
};

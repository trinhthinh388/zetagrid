import { Cell } from '../cell/cell';
import { Header } from '../header/header';
import { BaseGridPlugin } from '../plugins/base';
import { ColumnDefinition, RowData } from '../types';

export interface IGrid<TData extends RowData = RowData> {
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

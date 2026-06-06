import { Cell } from '../cell/cell';
import { Header } from '../header/header';
import { BaseGridPlugin } from '../plugins/base';
import { ColumnDefinition, ElementAttributes, RowData } from '../types';

export interface IGrid<TData extends RowData = RowData> {
  init: () => void;
  destroy: () => void;
  getHeader: () => Header<TData>;
  getCellById: (cellId: string) => Cell<TData>;
  ref: (element: HTMLDivElement | null) => void;
  getElementAttributes: () => ElementAttributes;
  getColumnDefinitions: () => ColumnDefinition<TData>[];
  register: (...PluginClasses: (typeof BaseGridPlugin<TData>)[]) => void;
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

import { proxy } from 'valtio';
import { Cell } from '../cell/cell';
import { Header } from '../header/header';
import { BaseGridPlugin } from '../plugins/base';
import { ComputedRect, ElementAttributes, RowData } from '../types';
import { ColumnDefinition } from '../types/columns';
import { getComputedRect } from '../utils/get-computed-rect';
import { GridObservers, GridState, IGrid } from './types';

export type GridConstructorParams<TData extends RowData = RowData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
};

export class Grid<TData extends RowData = RowData> implements IGrid<TData> {
  data: TData[];
  rect: ComputedRect;
  header: Header<TData>;
  dom: HTMLElement | null;
  observers: GridObservers;
  plugins: Map<string, BaseGridPlugin<TData>>;
  columnDefinitions: ColumnDefinition<TData>[];

  state: GridState = proxy({
    init: false,
  });

  constructor({ data, columnDefinitions }: GridConstructorParams<TData>) {
    this.rect = {
      x: 0,
      y: 0,
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    };
    this.dom = null;
    this.data = data;
    this.plugins = new Map();
    this.header = new Header<TData>({
      grid: this,
    });
    this.columnDefinitions = columnDefinitions;
    this.observers = {
      resize: this.#createResizeObserver(),
    };
  }

  getHeader = (): Header<TData> => {
    return this.header;
  };

  getColumnDefinitions = (): ColumnDefinition<TData>[] => {
    return this.columnDefinitions;
  };

  getCellById = (cellId: string): Cell<TData> => {
    return this.header.getCellById(cellId);
  };

  init = (): void => {
    if (!this.dom) return;
    this.#initGrid();
    this.state.init = true;
  };

  ref = (element: HTMLDivElement | null): void => {
    this.dom = element;
    if (!this.state.init) this.init();
  };

  destroy = (): void => {
    this.plugins.forEach((plugin) => plugin.destroy());
    this.observers.resize.disconnect();
  };

  getElementAttributes = (): ElementAttributes => {
    return {
      role: 'grid',
      'data-slot': 'grid',
      className: 'zeta-grid__root',
    };
  };

  register = (...PluginClasses: (typeof BaseGridPlugin<TData>)[]): void => {
    PluginClasses.forEach((PluginClass) => {
      const plugin = new PluginClass({ grid: this });
      this.plugins.set(PluginClass.name, plugin);
      plugin.init();
    });
  };

  /**
   * Retrieve a registered plugin by its class.
   * Throws if not found.
   */
  getPlugin = <TPlugin extends typeof BaseGridPlugin<TData>>(
    PluginClass: TPlugin,
  ): InstanceType<TPlugin> => {
    const plugin = this.plugins.get(PluginClass.name);
    if (!plugin) throw new Error(`Plugin ${PluginClass.name} is not registered`);
    return plugin as unknown as InstanceType<TPlugin>;
  };

  #createResizeObserver(): ResizeObserver {
    const callback = () => void 0;
    return new ResizeObserver(callback);
  }

  #initGrid() {
    if (!this.dom) return;
    this.rect = getComputedRect(this.dom as HTMLDivElement);
    this.observers.resize.observe(this.dom);
  }
}

import { Cell } from '../cell/cell';
import { BaseGridComponent, RenderResult } from '../common';
import { Header } from '../header/header';
import { BaseGridPlugin } from '../plugins/base';
import { RowData } from '../types';
import { ColumnDefinition } from '../types/columns';
import { GridState, IGrid } from './types';

export type GridConstructorParams<TData extends RowData = RowData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
};

export class Grid<TData extends RowData = RowData>
  extends BaseGridComponent<GridState>
  implements IGrid<TData>
{
  #header: Header<TData>;
  #plugins: Map<string, BaseGridPlugin<TData>>;
  #columnDefinitions: ColumnDefinition<TData>[];

  constructor({ columnDefinitions }: GridConstructorParams<TData>) {
    super();
    this.#plugins = new Map();
    this.#header = new Header<TData>({
      grid: this,
    });
    this.#columnDefinitions = columnDefinitions;
  }

  getHeader = (): Header<TData> => {
    return this.#header;
  };

  init = (): void => {
    this.#header.init();
    this.state.set('init', true);
  };

  getColumnDefinitions = (): ColumnDefinition<TData>[] => {
    return this.#columnDefinitions;
  };

  getCellById = (cellId: string): Cell<TData> => {
    return this.#header.getCellById(cellId);
  };

  destroy = (): void => {
    this.#header.destroy();
    this.#plugins.forEach((plugin) => plugin.destroy());
  };

  render = (): RenderResult[] => [
    {
      children: [],
      attributes: {
        role: 'grid',
        'data-slot': 'grid',
        className: 'zeta-grid__root',
      },
    },
  ];

  register = (...PluginClasses: (typeof BaseGridPlugin<TData>)[]): void => {
    PluginClasses.forEach((PluginClass) => {
      const plugin = new PluginClass({ grid: this });
      this.#plugins.set(PluginClass.name, plugin);
      plugin.init();
    });
  };

  getPlugin = <TPlugin extends typeof BaseGridPlugin<TData>>(
    PluginClass: TPlugin,
  ): InstanceType<TPlugin> => {
    const plugin = this.#plugins.get(PluginClass.name);
    if (!plugin) throw new Error(`Plugin ${PluginClass.name} is not registered`);
    return plugin as unknown as InstanceType<TPlugin>;
  };
}

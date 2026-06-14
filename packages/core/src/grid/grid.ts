import { Body } from '../body/body';
import { Cell } from '../cell/cell';
import { BaseGridComponent, RenderResult } from '../common';
import { register } from '../common/annotations/register';
import { gridRegistry } from '../common/registry';
import { Header } from '../header/header';
import { BaseGridPlugin } from '../plugins/base';
import { RowData } from '../types';
import { ColumnDefinition } from '../types/columns';
import { generateId } from '../utils';
import { GridState, IGrid } from './types';

export type GridConstructorParams<TData extends RowData = RowData> = {
  data: TData[];
  columnDefinitions: ColumnDefinition<TData>[];
};

@register
export class Grid<TData extends RowData = RowData>
  extends BaseGridComponent<GridState>
  implements IGrid<TData>
{
  private data: TData[];
  private body: Body<TData>;
  private header: Header<TData>;
  private id = `grid_${generateId()}`;
  private plugins: Map<string, BaseGridPlugin<TData>>;
  private columnDefinitions: ColumnDefinition<TData>[];

  getId = (): string => this.id;

  getData = (): TData[] => {
    return this.data;
  };

  getBody = (): Body<TData> => {
    return this.body;
  };

  getHeader = (): Header<TData> => {
    return this.header;
  };

  override refresh = (): void => {
    this.header.refresh();
    this.body.refresh();
  };

  getColumnDefinitions = (): ColumnDefinition<TData>[] => {
    return this.columnDefinitions;
  };

  getCellById = (cellId: string): Cell<TData> => {
    return this.header.getCellById(cellId);
  };

  init = (): void => {
    this.header.init();
    this.body.init();
    this.state.set('init', true);
  };

  destroy = (): void => {
    this.body.destroy();
    this.header.destroy();
    this.plugins.forEach((plugin) => plugin.destroy());
    gridRegistry.unregister(this.id);
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
      const plugin = new PluginClass({ gridId: this.id });
      this.plugins.set(PluginClass.name, plugin);
      plugin.init();
    });
  };

  getPlugin = <TPlugin extends typeof BaseGridPlugin<TData>>(
    PluginClass: TPlugin,
  ): InstanceType<TPlugin> => {
    const plugin = this.plugins.get(PluginClass.name);
    if (!plugin) throw new Error(`Plugin ${PluginClass.name} is not registered`);
    return plugin as unknown as InstanceType<TPlugin>;
  };

  constructor({ data = [], columnDefinitions }: GridConstructorParams<TData>) {
    super();
    this.plugins = new Map();
    this.header = new Header<TData>({
      gridId: this.id,
    });
    this.body = new Body<TData>({ gridId: this.id });
    this.columnDefinitions = columnDefinitions;
    this.data = data;
  }
}

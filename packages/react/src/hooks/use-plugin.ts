import { BaseGridPlugin, RowData } from '@core';
import { useGrid } from '../grid/grid-context';

export const usePlugin = <
  TData extends RowData = RowData,
  TPlugin extends typeof BaseGridPlugin<TData> = typeof BaseGridPlugin<TData>,
>(
  PluginClass: TPlugin,
): InstanceType<TPlugin> => {
  const grid = useGrid<TData>();
  return grid.getPlugin(PluginClass) as InstanceType<TPlugin>;
};

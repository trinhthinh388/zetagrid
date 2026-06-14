import { RowData } from '@core';
import { VirtualizationPlugin } from '@core/plugins/virtualization';
import { Cell } from '../cell';
import { Renderer } from '../common/renderer';
import { useHeader, usePlugin, useWatch } from '../hooks';

export type HeaderRowProps<TData extends RowData = RowData> = { id: string };

export const HeaderRow = <TData extends RowData = RowData>({ id }: HeaderRowProps<TData>) => {
  const header = useHeader<TData>();
  const row = header.getHeaderRowById(id);
  const virtualization = usePlugin<TData, typeof VirtualizationPlugin<TData>>(VirtualizationPlugin);

  useWatch(row.getRect());
  useWatch(row.getState());
  useWatch(virtualization.scroll);

  const visibleCells = row.getCells().filter((cell) => virtualization.isCellVisible(cell));

  return (
    <Renderer render={row.render()}>
      {visibleCells.map((cell) => (
        <Cell key={cell.getId()} id={cell.getId()} />
      ))}
    </Renderer>
  );
};

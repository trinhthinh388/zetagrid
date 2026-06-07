import { RowData } from '@core';
import { Renderer } from '../common/renderer';
import { useHeader, useWatch } from '../hooks';

export type HeaderRowProps<TData extends RowData = RowData> = { id: string };

export const HeaderRow = <TData extends RowData = RowData>({ id }: HeaderRowProps<TData>) => {
  const header = useHeader<TData>();
  const row = header.getHeaderRowById(id);

  console.log(row);

  useWatch(row.getRect());
  // const virtualization = usePlugin<TData, typeof VirtualizationPlugin<TData>>(VirtualizationPlugin);

  // const { init } = useSnapshot(row.state);
  // const { top, left, width, height } = useSnapshot(row.rect);

  // // Subscribe to scroll changes so the component re-renders on scroll
  // useSnapshot(virtualization.scroll);

  // const visibleCells = row.cells.filter((cell) => virtualization.isCellVisible(cell));

  return <Renderer render={row.render()} />;
};
